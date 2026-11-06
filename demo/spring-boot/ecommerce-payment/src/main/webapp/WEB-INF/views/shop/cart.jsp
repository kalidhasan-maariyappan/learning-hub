<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main" class="page-width container-fluid content-space">
    <p class="eyebrow">GOOD CHOICES, ALL TOGETHER</p>
    <div class="section-heading">
        <h1>Your bag<span class="title-count">${cart.count}</span></h1>
        <a class="text-link" href="<c:url value='/'/>#collection">Keep exploring ↗</a>
    </div>
    <c:choose>
        <c:when test="${empty cart.lines}">
            <div class="empty-state"><i class="bi bi-bag"></i>
                <h2>A little room for something good.</h2>
                <p>Your bag is waiting for a few everyday favourites.</p>
                <a class="btn btn-primary" href="<c:url value='/'/>#collection">Explore the collection ↗</a>
            </div>
        </c:when>
        <c:otherwise>
            <div class="checkout-grid">
                <div>
                    <c:forEach items="${cart.lines}" var="line">
                        <div class="cart-line">
                            <a class="cart-art art-${line.product.art}" href="<c:url value='/products/${line.product.id}'/>">
                                <img src="<c:url value='/assets/images/${line.product.art}.svg'/>" alt="<c:out value='${line.product.title}'/>">
                            </a>
                            <div class="cart-line-copy">
                                <p class="eyebrow"><c:out value="${line.product.category}" /></p>
                                <h3><c:out value="${line.product.title}" /></h3>
                                <p class="muted"><c:out value="${line.product.money}" /> each</p>
                                <form method="post" action="<c:url value='/cart/items'/>" class="cart-update validated-form">

                                    <%@ include file="../fragments/csrf.jspf" %>

                                    <input type="hidden" name="productId" value="${line.product.id}">
                                    <label class="visually-hidden" for="quantity-${line.product.id}">Quantity for <c:out value="${line.product.title}" />
                                    </label>
                                    <input id="quantity-${line.product.id}" class="form-control quantity" type="number" name="quantity" min="0" max="99"
                                        value="${line.quantity}" required>
                                    <button class="text-button">Update</button>
                                    <button class="text-button" name="remove" value="true">Remove</button>
                                </form>
                            </div><strong><c:out value="${line.money}" /></strong>
                        </div>
                    </c:forEach>
                </div>
                <aside class="summary-card">
                    <p class="eyebrow">A THOUGHTFUL LITTLE HAUL</p>
                    <h2>Bag summary</h2>
                    <div class="summary-row"><span>Subtotal</span><span><c:out value="${cart.money}" /></span></div>
                    <div class="summary-row"><span>Delivery</span><span>On us</span></div>
                    <div class="summary-row summary-total"><span>Total</span><span><c:out value="${cart.money}" /></span></div>
                    <a class="btn btn-primary w-100" href="<c:url value='/checkout'/>">Continue to checkout <i class="bi bi-arrow-right"></i></a>
                    <p class="small muted"><i class="bi bi-lock"></i> Secure checkout · Razorpay Test Mode</p>
                </aside>
            </div>
        </c:otherwise>
    </c:choose>
</main>

<%@ include file="../fragments/footer.jspf" %>
