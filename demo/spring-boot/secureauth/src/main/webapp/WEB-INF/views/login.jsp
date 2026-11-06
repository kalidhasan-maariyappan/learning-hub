<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@ include file="fragments/head.jspf" %>
    <title>Sign in - SecureAuth</title>
</head>
<body class="auth-body">
<main class="auth-shell">
    <%@ include file="fragments/brand.jspf" %>
    <section class="auth-panel">
        <div class="auth-card">
            <div class="brand-mark d-lg-none mb-4"><span>S</span>SecureAuth</div>
            <h1 class="auth-title">Welcome back</h1>
            <p class="auth-subtitle">Sign in to continue to your dashboard.</p>

            <c:if test="${param.registered != null}"><div class="alert alert-success" role="status">Account created successfully. Please sign in.</div></c:if>
            <c:if test="${param.logout != null}"><div class="alert alert-info" role="status">You have been signed out.</div></c:if>
            <c:if test="${param.expired != null}"><div class="alert alert-warning" role="status">Your session expired. Please log in again.</div></c:if>
            <c:if test="${param.error != null}"><div class="alert alert-danger" role="alert">Invalid email or password.</div></c:if>

            <form action="${pageContext.request.contextPath}/login" method="post" novalidate data-validate="login">
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" name="email" autocomplete="username" placeholder="you@example.com" required>
                    <div class="invalid-feedback" id="email-error"></div>
                </div>
                <div class="mb-4">
                    <label for="password" class="form-label">Password</label>
                    <div class="input-group">
                        <input type="password" class="form-control" id="password" name="password" autocomplete="current-password" placeholder="Your password" required>
                        <button type="button" class="btn btn-toggle" data-toggle-password="password" aria-label="Show password">Show</button>
                        <div class="invalid-feedback" id="password-error"></div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-lg w-100">Sign in</button>
            </form>
            <p class="auth-switch">New to SecureAuth? <a href="${pageContext.request.contextPath}/register">Create an account</a></p>
        </div>
    </section>
</main>
<script src="${pageContext.request.contextPath}/js/validation.js" defer></script>
</body>
</html>
