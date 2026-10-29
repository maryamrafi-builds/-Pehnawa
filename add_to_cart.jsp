
<%@ page import="java.util.*" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<%
String product = request.getParameter("product");

// Check whether the user is logged in.
if (session.getAttribute("userId") == null) {

    // Remember which product the user selected.
    if (product != null && !product.trim().isEmpty()) {
        session.setAttribute("pendingProduct", product);
    }
    response.sendRedirect("login.html");
    return;
}

// User is logged in: add the product to the session cart.
if (product != null && !product.trim().isEmpty()) {

    List<String> cart =
        (List<String>) session.getAttribute("cart");

    if (cart == null) {
        cart = new ArrayList<String>();
        session.setAttribute("cart", cart);
    }

    cart.add(product);
}

response.sendRedirect("homepage.html?cart=added");
%>
