<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <script src="https://js.stripe.com/v3/"></script>

        <link rel="stylesheet" href="{{ asset('css/app.css') }}">

        <style>
            .spacer {
                margin-bottom: 24px;
            }
            /**
             * The CSS shown here will not be introduced in the Quickstart guide, but shows
             * how you can use CSS to style your Element's container.
             */
            .StripeElement {
              background-color: white;
              padding: 10px 12px;
              border-radius: 4px;
              border: 1px solid #ccd0d2;
              box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
              -webkit-transition: box-shadow 150ms ease;
              transition: box-shadow 150ms ease;
            }
            .StripeElement--focus {
              box-shadow: 0 1px 3px 0 #cfd7df;
            }
            .StripeElement--invalid {
              border-color: #fa755a;
            }
            .StripeElement--webkit-autofill {
              background-color: #fefde5 !important;
            }
            #card-errors {
                color: #fa755a;
            }
        </style>

    </head>
    <body>
        <div class="container">
            <div class="col-md-6 col-md-offset-3">
                <h1>Payment Form</h1>
                <div class="spacer"></div>

                {{-- <form action="{{ url('/checkout') }}" method="POST" id="payment-form">
                    {{ csrf_field() }} --}}

                    <div class="form-group">
                        <label for="card-holder-name">Name on Card</label>
                        <input type="text" class="form-control" id="card-holder-name" name="card-holder-name">
                    </div>

                    <div class="form-group">
                        <label for="intent-secret">Intent secret</label>
                        <input type="text" class="form-control" id="intent-secret" name="intent-secret">
                    </div>

                    <div class="form-group">
                        <label for="card-element">Credit Card</label>
                        <div id="card-element">
                          <!-- a Stripe Element will be inserted here. -->
                      </div>

                      <!-- Used to display form errors -->
                      <div id="card-errors" role="alert"></div>
                    </div>

                    <div class="spacer"></div>

                    <button id="card-button" name="card-button" class="btn btn-success">Submit Payment</button>
                {{-- </form> --}}
            </div>
        </div>

        <script>
            (function(){
                // Create a Stripe client
                var stripe = Stripe('{{ env('STRIPE_KEY', '') }}');
                // Create an instance of Elements
                var elements = stripe.elements();
                // Custom styling can be passed to options when creating an Element.
                // (Note that this demo uses a wider set of styles than the guide below.)
                var style = {
                  base: {
                    color: '#32325d',
                    lineHeight: '18px',
                    fontFamily: '"Raleway", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                      color: '#aab7c4'
                    }
                  },
                  invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                  }
                };
                // Create an instance of the card Element
                var card = elements.create('card', {
                    style: style,
                    hidePostalCode: true
                });
                // Add an instance of the card Element into the `card-element` <div>
                card.mount('#card-element');
                // Handle form submission
                const cardHolderName = document.getElementById('card-holder-name');
                const cardButton = document.getElementById('card-button');
                const secretElement = document.getElementById('intent-secret');

                cardButton.addEventListener('click', async (e) => {
                    const { setupIntent, error } = await stripe.confirmCardSetup(
                        secretElement.value, {
                            payment_method: {
                                card,
                                billing_details: { name: cardHolderName.value }
                            }
                        }
                    );

                    if (error) {
                        console.log(error);
                    } else {
                        console.log(setupIntent.payment_method)
                    }
                });
            })();
        </script>
    </body>
</html>
