# TLV-300 Test

This application is using laravel framework as backend and reactjs as the frontend via inertiajs.

Frontend code is located in `resources` folder.

### Machine Requirements

- minimum Node.js version of 14.0.0
- minimum PHP version of 8.2
- composer

### Running the App

1. **Clone the repository**:

    ```bash
    git clone https://github.com/elegisandi/tlv-300-test.git
    cd tlv-300-test
    ```

2. **Install dependencies**:
   Ensure you have `npm`, and `composer` installed, then run:

    ```bash
    npm install
    composer install
    ```

3. **Setup environment file**:

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. **Build the app and run the server**:

    ```bash
    composer run start:ssr
    ```

5. **Access the app**:
   Open your browser and navigate to `http://localhost:5000`.
