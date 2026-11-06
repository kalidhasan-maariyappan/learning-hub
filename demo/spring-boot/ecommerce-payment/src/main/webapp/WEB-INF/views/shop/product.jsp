<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main" class="page-width container-fluid content-space">
    <a class="breadcrumb-link" href="<c:url value='/'/>#collection">← The collection</a>
    <div class="detail-grid">
        <div class="detail-art art-${product.art}">
            <img src="<c:url value='/assets/images/${product.art}.svg'/>" alt="<c:out value='${product.title}'/>">
        </div>
        <div class="detail-copy">
            <p class="eyebrow"><c:out value="${product.category}" /> / CONSIDERED ESSENTIALS</p>
            <h1><c:out value="${product.title}" /></h1>
            <p class="detail-price"><c:out value="${product.money}" /></p>
            <p class="detail-description"><c:out value="${product.description}" /></p>
            <p><span class="status-dot"></span> <c:out value="${product.stockQuantity}" /> available · Complimentary delivery</p>
            <form action="<c:url value='/cart/items'/>" method="post" class="validated-form add-form">

                <%@ include file="../fragments/csrf.jspf" %>

                <input type="hidden" name="productId" value="${product.id}">
                <input type="hidden" name="add" value="true">
                <label for="quantity">Quantity</label>
                <input class="form-control quantity" id="quantity" name="quantity" type="number" min="1"
                    max="${product.stockQuantity lt 99?product.stockQuantity:99}" value="1" required>
                <button class="btn btn-primary" ${product.stockQuantity eq 0?'disabled':''}>Add to bag <i class="bi bi-plus-lg"></i></button>
            </form>
            <div class="detail-promises"><span><i class="bi bi-box-seam"></i> Carefully packed</span><span><i class="bi bi-shield-check"></i> Secure
                    checkout</span></div>
            <p class="small muted">SKU <c:out value="${product.sku}" /> · This is a test store; products are not shipped.</p>
        </div>
    </div>
</main>

<%@ include file="../fragments/footer.jspf" %>
