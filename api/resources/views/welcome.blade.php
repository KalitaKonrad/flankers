@extends('app')

@section('content')
<div class="relative flex flex-col items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
    <p class="text-white">Hello</p>
    <div id="access_token" class="w-full px-12 mx-auto break-words">{{ auth()->login($user) }}</div>
</div>
@endsection
