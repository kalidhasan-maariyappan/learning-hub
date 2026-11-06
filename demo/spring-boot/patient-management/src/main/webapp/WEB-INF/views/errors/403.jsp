<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@ include file="/WEB-INF/views/fragments/header.jspf" %>
    <title>Access denied - Patient Management</title>
</head>
<body class="auth-body">
<main class="auth-card text-center">
    <p class="display-6 fw-semibold text-danger mb-2">403</p>
    <h1 class="h4">Access denied</h1>
    <p class="text-secondary">Your account does not have permission to perform this action.</p>
    <a class="btn btn-primary" href="${pageContext.request.contextPath}/dashboard">Back to dashboard</a>
</main>
<%@ include file="/WEB-INF/views/fragments/footer.jspf" %>
</body>
</html>
