<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main" class="auth-shell page-width container-fluid">
    <div class="auth-story">
        <p class="eyebrow">A PLACE FOR THE EVERYDAY</p>
        <h1>Good to
            <br>have you <em>back.</em>
        </h1>
        <img src="<c:url value='/assets/images/chair.svg'/>" alt="Oak lounge chair">
        <p>Make a little room for the things you love.</p>
    </div>
    <section class="auth-form">
        <p class="eyebrow">YOUR FORM &amp; FIELD</p>
        <h2>Welcome back.</h2>
        <p class="muted">Sign in to your considered collection.</p>
        <c:if test="${param.error ne null}">
            <div role="alert" class="alert alert-danger">Email or password is incorrect.</div>
        </c:if>
        <c:if test="${param.logout ne null}">
            <div role="status" class="alert alert-success">You have been signed out.</div>
        </c:if>
        <form method="post" action="<c:url value='/login'/>" class="validated-form">

            <%@ include file="../fragments/csrf.jspf" %>

            <label for="email">Email address</label>
            <input class="form-control" type="email" id="email" name="username" autocomplete="username" maxlength="254" placeholder="you@example.com" required>
            <label for="password">Password</label>
            <input class="form-control" type="password" name="password" id="password" autocomplete="current-password" required>
            <button class="btn btn-primary w-100">Sign in <i class="bi bi-arrow-right"></i></button>
        </form>
        <p class="auth-switch">New here? <a href="<c:url value='/register'/>">Create an account ↗</a>
        </p>
        <div class="test-note"><i class="bi bi-shield-check"></i><span>A little space to explore.
                <br><small>All payments are in Razorpay Test Mode.</small>
            </span></div>
    </section>
</main>

<%@ include file="../fragments/footer.jspf" %>
