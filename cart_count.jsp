
<%@ page import="java.util.*" %>
<%@ page contentType="text/plain; charset=UTF-8" %>
<%
List<String> cart =
    (List<String>) session.getAttribute("cart");

int count = (cart == null) ? 0 : cart.size();

out.print(count);
%>
