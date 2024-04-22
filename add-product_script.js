document.addEventListener('DOMContentLoaded', function () {
    // Get the submit button
    var submitBtn = document.getElementById('submitProductBtn');

    // Add click event listener to the submit button
    submitBtn.addEventListener('click', function () {
        // Get input values
        var productName = document.getElementById('productName').value;
        var productCode = document.getElementById('productCode').value;
        var stock = parseInt(document.getElementById('stock').value);
        var price = parseFloat(document.getElementById('price').value);

        // Validate input
        if (!productName || !productCode || isNaN(stock) || isNaN(price)) {
            alert('Please fill in all fields with valid values.');
            return;
        }

        // Create a new product object
        var newProduct = {
            name: productName,
            code: productCode,
            stock: stock,
            price: price
        };

        // Fetch existing product data from products.json
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                // Add the new product to the existing data
                data.push(newProduct);

                // Convert the updated data to JSON string
                var jsonData = JSON.stringify(data, null, 2);

                // Update the products.json file with the new data
                fetch('products.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: jsonData
                })
                    .then(() => {
                        // Redirect to inventory.html after successfully adding the new product
                        window.location.href = 'inventory.html';
                    })
                    .catch(error => console.error('Error updating products.json:', error));
            })
            .catch(error => console.error('Error fetching product data:', error));
    });
});
