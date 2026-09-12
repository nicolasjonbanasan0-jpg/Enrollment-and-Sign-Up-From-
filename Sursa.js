function setupRSA(keySize) {

    const form = document.getElementById("signupForm");

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get user information
        const fullname = document.getElementById("fullname").value;
        const dob = document.getElementById("dob").value;
        const yearlevel = document.getElementById("yearlevel").value;
        const gender = document.getElementById("gender").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Combine signup information
        const originalData =
            "Full Name: " + fullname +
            "\nDate of Birth: " + dob +
            "\nYear Level: " + yearlevel +
            "\nGender: " + gender +
            "\nUsername: " + username +
            "\nPassword: " + password;

        // Create RSA object
        const crypt = new JSEncrypt({
            default_key_size: keySize
        });

        // Generate RSA key pair
        crypt.getKey();

        // Get public and private keys
        const publicKey = crypt.getPublicKey();
        const privateKey = crypt.getPrivateKey();

        // Encrypt data
        const encrypted = crypt.encrypt(originalData);

        // Decrypt data
        crypt.setPrivateKey(privateKey);
        const decrypted = crypt.decrypt(encrypted);

        // Display results
        document.getElementById("original").value = originalData;

        if (encrypted) {
            document.getElementById("encrypted").value = encrypted;
        } else {
            document.getElementById("encrypted").value =
                "Encryption failed. The data may be too large for this RSA key size.";
        }

        if (decrypted) {
            document.getElementById("decrypted").value = decrypted;
        } else {
            document.getElementById("decrypted").value =
                "Decryption failed.";
        }

        console.log("RSA Key Size:", keySize);
        console.log("Public Key:", publicKey);
        console.log("Private Key:", privateKey);
    });
}
