// Function to fetch product data from products.json
async function fetchProductData() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product data:', error);
        return [];
    }
}

// Function to add a new product row to the invoice table
async function addProduct() {
    // Get input values
    var productNameOrCode = document.getElementById("productNameOrCode").value;
    var quantityInput = document.getElementById("quantity").value;

    // Check if the quantity input is empty or not a number
    if (quantityInput === '' || isNaN(quantityInput)) {
        alert("Please enter a valid quantity.");
        return;
    }

    var quantity = parseFloat(quantityInput);

    // Fetch product data
    var productData = await fetchProductData();

    // Find product details from product data
    var product = productData.find(item => item.name === productNameOrCode || item.code === productNameOrCode);

    if (product) {
        // Calculate GST and total
        var gst = (0.18 * product.price * quantity).toFixed(2);
        var amount = (product.price * quantity).toFixed(2);

        // Create a new row for the invoice table
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${document.querySelectorAll("#invoiceTable tbody tr").length}</td>
            <td>${product.name}</td>
            <td>${quantity}</td>
            <td>${product.price}</td>
            <td>${gst}</td>
            <td>${amount}</td>
        `;

        // Append the new row to the table body
        document.querySelector("#invoiceTable tbody").appendChild(newRow);

        // Remove the previous input row
        var inputRow = document.getElementById("inputRow");
        inputRow.parentNode.removeChild(inputRow);

        // Create a new input row for the next product
        createInputRow();

        // Update the total amount here instead of calling the updateTotal function
        //var totalAmount = 12203.00;
        var totalAmount = parseFloat(document.getElementById("totalAmount").textContent);
        totalAmount += parseFloat(amount);
        document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);
    } else {
        alert("Product not found in inventory!");
    }
}

// Function to create a new input row for the next product
function createInputRow() {
    var inputRow = document.createElement("tr");
    inputRow.id = "inputRow";
    inputRow.innerHTML = `
        <td> </td>
        <td><input type="text" id="productNameOrCode" class= "productNameOrCode" placeholder="Product Name or Code"></td>
        <td><input type="number" id="quantity" class="quantity" placeholder="Quantity"></td>
        <td><button id="submitProductBtn" class="submitProductBtn">Add Product</button></td>
        <td></td>
        <td></td>
    `;
    // inputRow.style.backgroundColor = "red";
    // Add any other styling properties you want to modify

    // Add event listener to the new "Submit" button
    inputRow.querySelector("#submitProductBtn").addEventListener("click", addProduct);

    // Append the new input row to the table body
    document.querySelector("#invoiceTable tbody").appendChild(inputRow);
}

// Create the initial input row
createInputRow();

// Add event listener to the "Submit" button of the initial input row
document.getElementById("submitProductBtn").addEventListener("click", addProduct);