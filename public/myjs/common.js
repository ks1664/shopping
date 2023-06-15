var BASE_URL="http://localhost:8022/"

function openForm() {
    document.getElementById("minus").style.display = "block";
    document.getElementById("plus").style.display = "none";
    $("#myform").slideDown(2000);
}

function closeForm() {
    document.getElementById("minus").style.display = "none";
    document.getElementById("plus").style.display = "block";
    $("#myform").slideUp(2000);
}