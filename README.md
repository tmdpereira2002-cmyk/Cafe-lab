# Café Lab

Espresso dial-in and brew guide that works offline. Install it from your browser ("Add to Home Screen").

- `config.js` holds the Firebase web config for syncing profiles (leave `null` to run without sync).
- `firestore.rules` are the database rules to paste into Firebase.
- `cafe.html` is **Café Lab for Cafés** (website first, app later): a Boss/manager menu (café setup, staff training sign-off, house recipes, drink cost & margin, order planner, break-even, cleaning routines) and a Barista-in-training menu (training path, guides for the café's own machine and grinder, calculators, routines), plus a guide to 25 commercial espresso machines and 15 grinders. Data is saved on the device for now.
