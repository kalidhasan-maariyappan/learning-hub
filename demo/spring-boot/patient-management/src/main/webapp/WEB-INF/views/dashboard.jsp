<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@ include file="/WEB-INF/views/fragments/header.jspf" %>
    <title>Dashboard - Patient Management</title>
</head>
<body>
<nav class="navbar bg-white border-bottom px-3">
    <span class="navbar-brand fw-semibold">Patient Management</span>
    <div class="d-flex align-items-center gap-3">
        <%-- sec:authentication output is HTML-escaped by default --%>
        <span class="text-secondary small">
            <sec:authentication property="name"/>
            (<sec:authorize access="hasRole('ADMIN')">ADMIN</sec:authorize><sec:authorize access="hasRole('STAFF')">STAFF</sec:authorize>)
        </span>
        <form action="${pageContext.request.contextPath}/logout" method="post" class="m-0">
            <sec:csrfInput/>
            <button type="submit" class="btn btn-outline-secondary btn-sm">Sign out</button>
        </form>
    </div>
</nav>
<main class="container py-5">
    <h1 class="h3">Dashboard</h1>
    <p class="text-secondary">You are signed in. Summary cards arrive in Phase 6.</p>
</main>
<%@ include file="/WEB-INF/views/fragments/footer.jspf" %>
</body>
</html>
