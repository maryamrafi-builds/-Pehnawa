<%@ page contentType="text/plain; charset=UTF-8" %>
<%
response.setHeader("Cache-Control", "no-store");

String userName = (String) session.getAttribute("userName");

if (session.getAttribute("userId") != null) {
    out.print("IN|" + (userName == null ? "" : userName));
} else {
    out.print("OUT|");
}
%>