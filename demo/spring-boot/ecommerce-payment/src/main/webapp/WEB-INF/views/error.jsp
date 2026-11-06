<%@ page pageEncoding="UTF-8" %>

<%@ include file="fragments/head.jspf" %>

<main id="main" class="page-width container-fluid content-space">
    <div class="empty-state">
        <p class="eyebrow">LET'S TAKE A MOMENT · <c:out value="${code}" /></p>
        <h1>A small pause.</h1>
        <p><c:out value="${message}" /></p>
        <div class="d-flex gap-3 justify-content-center">
            <a class="btn btn-primary" href="<c:url value='/orders'/>">Check your orders</a>
            <a class="btn btn-outline-secondary" href="<c:url value='/'/>">Back to the collection</a>
        </div>
    </div>
</main>

<%@ include file="fragments/footer.jspf" %>
