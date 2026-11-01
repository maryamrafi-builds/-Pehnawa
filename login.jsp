
<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<%
request.setCharacterEncoding("UTF-8");

String email = request.getParameter("email");
String password = request.getParameter("password");

if (email == null || password == null ||
    email.trim().isEmpty() || password.isEmpty()) {

    response.sendRedirect("login.html?error=empty");
    return;
}

String url = "jdbc:mysql://localhost:3306/pehnawa_signup";

try {
    Class.forName("com.mysql.cj.jdbc.Driver");

    try (Connection con =
             DriverManager.getConnection(url, "root", "");

         PreparedStatement ps = con.prepareStatement(
             "SELECT id, username, email FROM users " +
             "WHERE email = ? AND password = ?")) {

        ps.setString(1, email.trim());
        ps.setString(2, password);

        try (ResultSet rs = ps.executeQuery()) {

            if (rs.next()) {

                // Save the logged-in user's details in the session
                session.setAttribute("userId", rs.getInt("id"));
                session.setAttribute("userName", rs.getString("username"));
                session.setAttribute("userEmail", rs.getString("email"));

                // Check whether a product was selected before login
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

                // Email or password does not match
                response.sendRedirect("login.html?error=invalid");
                return;

            }
        }
    }

} catch (Exception e) {

    application.log("Login error", e);

    response.sendRedirect("login.html?error=failed");

}
%>
