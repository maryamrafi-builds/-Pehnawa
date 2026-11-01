<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<%
request.setCharacterEncoding("UTF-8");

String username = request.getParameter("username");
String email = request.getParameter("email");
String phone = request.getParameter("phone");
String password = request.getParameter("password");

if (username == null || email == null ||
    phone == null || password == null ||
    username.trim().isEmpty() || email.trim().isEmpty() ||
    phone.trim().isEmpty() || password.isEmpty()) {

    out.println("Please fill in all fields.");
    return;
}

String url = "jdbc:mysql://localhost:3306/pehnawa_signup";

try{
    Class.forName("com.mysql.cj.jdbc.Driver");

    try (Connection con =
             DriverManager.getConnection(url, "root", "");
         PreparedStatement ps = con.prepareStatement(
             "INSERT INTO users (username, email, phone, password) " +
             "VALUES (?, ?, ?, ?)")) {

        ps.setString(1, username.trim());
        ps.setString(2, email.trim());
        ps.setString(3, phone.trim());
        ps.setString(4, password);

        ps.executeUpdate();

       // Show success only after MySQL inserts the account.
        out.println("<!DOCTYPE html><html><body>");
        out.println("<script>");
        out.println("alert('Account created successfully!');");
        out.println("window.location.href = 'homepage.html';");
        out.println("</script>");
        out.println("</body></html>");
        
        }
} 
catch (SQLIntegrityConstraintViolationException e) {
    response.sendRedirect("sign_up.html?error=exists");

} catch (Exception e) {
    application.log("Signup error", e);
    response.sendRedirect("sign_up.html?error=failed");
}
%>