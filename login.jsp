<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<%
request.setCharacterEncoding("UTF-8");

String email = request.getParameter("email");
String password = request.getParameter("password");

String url = "jdbc:mysql://localhost:3306/pehnawa_signup";

try {
    Class.forName("com.mysql.cj.jdbc.Driver");

    try (Connection con =
             DriverManager.getConnection(url, "root", "");
         PreparedStatement ps = con.prepareStatement(
             "SELECT id, username FROM users " +
             "WHERE email = ? AND password = ?")) {

        ps.setString(1, email);
        ps.setString(2, password);

        try (ResultSet rs = ps.executeQuery()) {

            if (rs.next()) {
                
session.setAttribute("userId", rs.getInt("id"));
session.setAttribute("userName", rs.getString("username"));

// Was a product selected before login?
String pendingProduct =
    (String) session.getAttribute("pendingProduct");

if (pendingProduct != null) {
    session.removeAttribute("pendingProduct");

    response.sendRedirect(
        "add_to_cart.jsp?product=" +
        java.net.URLEncoder.encode(
            pendingProduct, "UTF-8"
        )
    );
} else {
    response.sendRedirect("homepage.html");
}
return;


            } else {
                // Credentials don't match.
                out.println("<!DOCTYPE html><html><body>");
                out.println("<script>");
                out.println("alert('Invalid email or password!');");
                out.println("window.location.href = 'login.html';");
                out.println("</script>");
                out.println("</body></html>");
            }
        }
    }

} catch (Exception e) {
    application.log("Login error", e);
    out.println("<h3>Login failed. Please try again later.</h3>");
    out.println("<a href='login.html'>Back to login</a>");
}
%>