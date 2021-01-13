<?php
// @codeCoverageIgnoreStart
namespace App\Http\Controllers\Avatar;

use App\Http\Message;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\AvatarUploadRequest;

class UserAvatarController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Get user avatar
     *
     * @group Avatars
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Message::ok('User avatar', Auth::user()->versioned_avatar);
    }

    /**
     * Update current user avatar
     *
     * "Data" key in result will contain new avatar url
     *
     * @group Avatars
     * @bodyParam avatar file required Avatar file, must be image under 4 MB
     *
     * @param  \Illuminate\Http\AvatarUploadRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AvatarUploadRequest $request)
    {
        $user = Auth::user();
        $uploadPath = $user->avatarPath();
        $file = $request->file('avatar');
        $url = Storage::cloud()->url($uploadPath);

        $img = Image::make($file)
            ->resize(300, null, function ($constraint) {
                $constraint->aspectRatio();
            })
            ->stream('jpg');

        Storage::cloud()->put($uploadPath, $img);
        $user->avatar = $url;
        $user->save();

        return Message::ok('Avatar changed', $user->versioned_avatar);
    }

    /**
     * Delete current user avatar and replace it with default one
     *
     * "Data" key in result will contain new avatar url
     *
     * @group Avatars
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        $user = Auth::user();

        Storage::cloud()->delete($user->avatarPath());
        $user->avatar = $user->defaultAvatar();
        $user->save();

        return Message::ok('Avatar deleted', $user->avatar);
    }
}
