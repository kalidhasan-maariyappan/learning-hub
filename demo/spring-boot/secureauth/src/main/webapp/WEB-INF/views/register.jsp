<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@ include file="fragments/head.jspf" %>
    <title>Create account - SecureAuth</title>
</head>
<body class="auth-body">
<main class="auth-shell">
    <%@ include file="fragments/brand.jspf" %>
    <section class="auth-panel">
        <div class="auth-card">
            <div class="brand-mark d-lg-none mb-4"><span>S</span>SecureAuth</div>
            <h1 class="auth-title">Create your account</h1>
            <p class="auth-subtitle">It takes less than a minute.</p>

            <form:form action="${pageContext.request.contextPath}/register" method="post" modelAttribute="registrationForm" novalidate="novalidate" data-validate="register">
                <div class="mb-3">
                    <label for="name" class="form-label">Full name</label>
                    <form:input path="name" id="name" cssClass="form-control" cssErrorClass="form-control is-invalid" autocomplete="name" placeholder="Jane Doe" required="required"/>
                    <div class="invalid-feedback" id="name-error"><form:errors path="name"/></div>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <form:input path="email" id="email" type="email" cssClass="form-control" cssErrorClass="form-control is-invalid" autocomplete="email" placeholder="you@example.com" required="required"/>
                    <div class="invalid-feedback" id="email-error"><form:errors path="email"/></div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <div class="input-group">
                        <form:password path="password" id="password" cssClass="form-control" cssErrorClass="form-control is-invalid" autocomplete="new-password" placeholder="At least 8 characters" required="required"/>
                        <button type="button" class="btn btn-toggle" data-toggle-password="password" aria-label="Show password">Show</button>
                        <div class="invalid-feedback" id="password-error"><form:errors path="password"/></div>
                    </div>
                </div>
                <div class="mb-4">
                    <label for="confirmPassword" class="form-label">Confirm password</label>
                    <div class="input-group">
                        <form:password path="confirmPassword" id="confirmPassword" cssClass="form-control" cssErrorClass="form-control is-invalid" autocomplete="new-password" placeholder="Repeat your password" required="required"/>
                        <button type="button" class="btn btn-toggle" data-toggle-password="confirmPassword" aria-label="Show password">Show</button>
                        <div class="invalid-feedback" id="confirmPassword-error"><form:errors path="confirmPassword"/></div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-lg w-100">Create account</button>
            </form:form>
            <p class="auth-switch">Already have an account? <a href="${pageContext.request.contextPath}/login">Sign in</a></p>
        </div>
    </section>
</main>
<script src="${pageContext.request.contextPath}/js/validation.js" defer></script>
</body>
</html>
