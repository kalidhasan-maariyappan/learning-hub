<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main" class="page-width container-fluid content-space">
    <p class="eyebrow">YOUR FORM &amp; FIELD</p>
    <div class="section-heading">
        <h1>Your orders.</h1>
        <a class="text-link" href="<c:url value='/'/>">Find your next favourite ↗</a>
    </div>
    <div class="panel">

        <%@ include file="../fragments/order-table.jspf" %>

    </div>
</main>

<%@ include file="../fragments/footer.jspf" %>
