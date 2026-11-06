<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@ include file="/WEB-INF/views/fragments/header.jspf" %>
    <title>Sign in - Patient Management</title>
</head>
<body class="auth-body">
<main class="auth-card">
    <h1 class="h4 mb-1">Patient Management</h1>
    <p class="text-secondary mb-4">Sign in to continue.</p>

    <%-- One generic message for wrong username OR wrong password (no user enumeration). --%>
    <c:if test="${param.error != null}">
        <div class="alert alert-danger" role="alert">Invalid username or password.</div>
    </c:if>
    <c:if test="${param.logout != null}">
        <div class="alert alert-success" role="status">You have been signed out.</div>
    </c:if>
    <c:if test="${param.expired != null}">
        <div class="alert alert-warning" role="status">Your session expired. Please sign in again.</div>
    </c:if>

    <form action="${pageContext.request.contextPath}/login" method="post">
        <sec:csrfInput/>
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" name="username"
                   autocomplete="username" required autofocus>
        </div>
        <div class="mb-4">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password"
                   autocomplete="current-password" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Sign in</button>
    </form>

    <p class="small text-secondary mt-4 mb-0">Educational demo with synthetic data only.</p>
</main>
<%@ include file="/WEB-INF/views/fragments/footer.jspf" %>
</body>
</html>
