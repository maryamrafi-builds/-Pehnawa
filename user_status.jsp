<%@ page contentType="text/plain; charset=UTF-8" %>
<%
response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

String userName = (String) session.getAttribute("userName");
String userEmail = (String) session.getAttribute("userEmail");

if (session.getAttribute("userId") != null) {

    out.print("IN|" +
        (userName == null ? "" : userName) + "|" +
        (userEmail == null ? "" : userEmail));

} else {
    out.print("OUT|");
}
%>