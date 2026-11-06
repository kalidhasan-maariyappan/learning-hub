<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main" class="auth-shell page-width container-fluid">
    <div class="auth-story">
        <p class="eyebrow">THOUGHTFULLY CHOSEN, FOR YOU</p>
        <h1>Your everyday,
            <br><em>reimagined.</em>
        </h1>
        <img src="<c:url value='/assets/images/vase.svg'/>" alt="Hand-finished ceramic vase">
        <p>A few good things can change the whole room.</p>
    </div>
    <section class="auth-form">
        <p class="eyebrow">JOIN FORM &amp; FIELD</p>
        <h2>Make yourself at home.</h2>
        <p class="muted">Create your account and find your favourites.</p>
        <form method="post" action="<c:url value='/register'/>" class="validated-form">

            <%@ include file="../fragments/csrf.jspf" %>

            <label for="name">Your name</label>
            <input class="form-control" id="name" name="name" autocomplete="name" maxlength="100" required>
            <label for="email">Email address</label>
            <input class="form-control" id="email" type="email" name="email" autocomplete="email" maxlength="254" required>
            <label for="password">Password <span class="muted small">(10–72 characters)</span></label>
            <input class="form-control" id="password" type="password" name="password" autocomplete="new-password" minlength="10" maxlength="72" required>
            <label for="confirmPassword">Confirm password</label>
            <input class="form-control" id="confirmPassword" type="password" name="confirmPassword" autocomplete="new-password" minlength="10" maxlength="72"
                required>
            <button class="btn btn-primary w-100">Create account <i class="bi bi-arrow-right"></i></button>
        </form>
        <p class="auth-switch">Already part of the collection? <a href="<c:url value='/login'/>">Sign in ↗</a>
        </p>
    </section>
</main>

<%@ include file="../fragments/footer.jspf" %>
