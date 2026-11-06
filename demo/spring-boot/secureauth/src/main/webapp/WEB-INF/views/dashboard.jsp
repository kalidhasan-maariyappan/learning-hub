<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@ include file="fragments/head.jspf" %>
    <title>Dashboard - SecureAuth</title>
</head>
<body class="app-body" data-session-timeout="${sessionTimeoutSeconds}" data-expired-url="${pageContext.request.contextPath}/dashboard">
<div class="app-shell">
    <aside class="sidebar d-none d-lg-flex">
        <div class="brand-mark brand-mark-light"><span>S</span>SecureAuth</div>
        <nav class="side-nav">
            <a class="active" href="${pageContext.request.contextPath}/dashboard">Dashboard</a>
            <a class="disabled" aria-disabled="true">Profile <small>soon</small></a>
            <a class="disabled" aria-disabled="true">Settings <small>soon</small></a>
        </nav>
        <div class="sidebar-foot">Session-based authentication</div>
    </aside>

    <div class="app-main">
        <header class="topbar">
            <div class="brand-mark d-lg-none"><span>S</span>SecureAuth</div>
            <div class="session-pill" title="Inactivity timeout is enforced by the server">
                <span class="dot"></span>Session expires in <strong id="session-countdown"><c:out value="${sessionTimeoutSeconds}"/></strong>s
            </div>
            <div class="topbar-user">
                <div class="avatar"><c:out value="${initials}"/></div>
                <form action="${pageContext.request.contextPath}/logout" method="post" class="m-0">
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                    <button type="submit" class="btn btn-outline-primary btn-sm">Log out</button>
                </form>
            </div>
        </header>

        <main class="content">
            <section class="welcome">
                <h1>Welcome, <c:out value="${username}"/></h1>
                <p>You are signed in as <c:out value="${email}"/>.</p>
            </section>

            <section class="row g-3 mb-4">
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="stat-card">
                        <span class="stat-label">Account status</span>
                        <span class="stat-value text-success">Active</span>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="stat-card">
                        <span class="stat-label">Role</span>
                        <span class="stat-value"><c:out value="${role}"/></span>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="stat-card">
                        <span class="stat-label">Inactivity timeout</span>
                        <span class="stat-value"><c:out value="${sessionTimeoutSeconds}"/>s</span>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="stat-card">
                        <span class="stat-label">Password storage</span>
                        <span class="stat-value">BCrypt</span>
                    </div>
                </div>
            </section>

            <section class="row g-3">
                <div class="col-12 col-lg-5">
                    <div class="panel">
                        <h2>Account details</h2>
                        <dl class="details">
                            <dt>Name</dt><dd><c:out value="${username}"/></dd>
                            <dt>Email</dt><dd><c:out value="${email}"/></dd>
                            <dt>Role</dt><dd><c:out value="${role}"/></dd>
                        </dl>
                    </div>
                </div>
                <div class="col-12 col-lg-7">
                    <div class="panel">
                        <h2>Recent activity <span class="badge text-bg-light">Sample content</span></h2>
                        <ul class="activity">
                            <li><span class="activity-dot"></span>Signed in to your account</li>
                            <li><span class="activity-dot"></span>Password stored as a BCrypt hash</li>
                            <li><span class="activity-dot"></span>Session protected with CSRF tokens</li>
                        </ul>
                    </div>
                </div>
            </section>
            <p class="session-note">Your session ends after <c:out value="${sessionTimeoutSeconds}"/> seconds without activity. The timer above is a guide; the server enforces the timeout.</p>
        </main>
    </div>
</div>
<script src="${pageContext.request.contextPath}/js/session.js" defer></script>
</body>
</html>
