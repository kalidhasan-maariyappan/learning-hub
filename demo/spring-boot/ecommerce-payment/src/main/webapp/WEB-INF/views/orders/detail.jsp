<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main" class="page-width container-fluid content-space">
    <a class="breadcrumb-link" href="<c:url value='/orders'/>">← Your orders</a>
    <div class="section-heading">
        <div>
            <p class="eyebrow">YOUR CONSIDERED COLLECTION</p>
            <h1>Order FF–${order.id}</h1>
        </div><span class="state state-${order.status}"><c:out value="${order.status}" /></span>
    </div>
    <c:choose>
        <c:when test="${order.status eq 'PAID'}">
            <div class="result-banner"><i class="bi bi-check-circle"></i>
                <div>
                    <h2>A good choice, confirmed.</h2>
                    <p>Your test payment was captured and independently confirmed with Razorpay.</p>
                </div>
            </div>
        </c:when>
        <c:when test="${order.status eq 'REFUNDED' or order.status eq 'PARTIALLY_REFUNDED'}">
            <div class="result-banner"><i class="bi bi-arrow-return-left"></i>
                <div>
                    <h2>Your refund is confirmed.</h2>
                    <p>The processed refund amount is shown below.</p>
                </div>
            </div>
        </c:when>
        <c:otherwise>
            <div class="result-banner pending"><i class="bi bi-hourglass-split"></i>
                <div>
                    <h2>One more step.</h2>
                    <p>Your order is saved. We'll show paid only when Razorpay confirms a captured payment.</p>
                </div>
            </div>
        </c:otherwise>
    </c:choose>
    <div class="checkout-grid">
        <div>
            <section class="panel">
                <div class="section-heading">
                    <h2>Your essentials</h2>
                    <button class="text-button no-print" onclick="window.print()"><i class="bi bi-printer"></i> Print receipt</button>
                </div>
                <c:forEach items="${items}" var="item">
                    <div class="summary-row"><span><c:out value="${item.productNameSnapshot}" /> × ${item.quantity}</span><strong><c:out
                                value="${item.money}" /></strong></div>
                </c:forEach>
                <div class="summary-row summary-total"><span>Total · INR</span><span><c:out value="${order.money}" /></span></div>
                <p class="small muted">Order receipt for testing. This is not a tax invoice.</p>
                <h3 class="mt-4">Delivery details</h3>
                <p><c:out value="${order.address}" /></p>
                <p class="small muted">Placed <c:out value="${order.createdAt}" /></p>
            </section>
            <section class="panel mt-4">
                <h2>Payment activity</h2>
                <c:if test="${empty payments}">
                    <p class="muted">No confirmed payment attempt yet.</p>
                </c:if>
                <c:forEach items="${payments}" var="payment">
                    <div class="summary-row">
                        <div><strong><c:out value="${payment.money}" /></strong>
                            <br>
                            <code><c:out value="${payment.gatewayPaymentId}" /></code>
                        </div><span class="state"><c:out value="${payment.status}" /></span>
                    </div>
                </c:forEach>
                <c:forEach items="${refunds}" var="refund">
                    <div class="summary-row">
                        <div>Refund · <c:out value="${refund.money}" />
                            <br><small class="muted"><c:out value="${refund.gatewayRefundId}" /></small>
                        </div><span class="state"><c:out value="${refund.status}" /></span>
                    </div>
                </c:forEach>
            </section>
            <details class="panel mt-4 no-print">
                <summary>Order timeline</summary>
                <c:forEach items="${audit}" var="entry">
                    <div class="timeline-entry"><small class="muted"><c:out value="${entry.createdAt}" /> · <c:out value="${entry.kind}" /></small>
                        <p><c:out value="${entry.detail}" /></p>
                    </div>
                </c:forEach>
            </details>
        </div>
        <aside class="summary-card no-print">
            <p class="eyebrow">SAFE &amp; SECURE</p>
            <h2>Payment</h2>
            <div class="summary-row summary-total"><span>Order total</span><span><c:out value="${order.money}" /></span></div>
            <c:if test="${order.status eq 'PENDING' and not empty order.gatewayOrderId}">
                <button id="pay-button" class="btn btn-primary w-100" data-key="<c:out value='${keyId}'/>" data-order="<c:out value='${order.gatewayOrderId}'/>"
                    data-amount="${order.totalMinorUnits}" data-local="${order.id}">Pay with Razorpay <i class="bi bi-arrow-up-right"></i></button>
                <p class="small muted mt-3">Use Razorpay's test payment options. Close the payment window to try again on this same order.</p>
            </c:if>
            <p id="payment-message" class="small" role="status"></p>
            <form method="post" action="<c:url value='/orders/${order.id}/reconcile'/>" data-loading="true">

                <%@ include file="../fragments/csrf.jspf" %>

                <button class="btn btn-outline-secondary w-100">Refresh payment status <i class="bi bi-arrow-clockwise"></i></button>
            </form>
            <p class="small muted mt-3">Pending or interrupted? Refresh the status before paying again. Inventory stays reserved for this order.</p>
            <div class="test-note"><i class="bi bi-shield-check"></i><span>Test Mode only
                    <br><small>No real money is moved.</small>
                </span></div>
            <form id="verify-form" method="post" action="<c:url value='/checkout/verify'/>">

                <%@ include file="../fragments/csrf.jspf" %>

                <input type="hidden" name="orderId" value="${order.id}">
                <input type="hidden" name="razorpay_order_id">
                <input type="hidden" name="razorpay_payment_id">
                <input type="hidden" name="razorpay_signature">
            </form>
        </aside>
    </div>
</main>
<c:if test="${order.status eq 'PENDING'}">
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</c:if>

<%@ include file="../fragments/footer.jspf" %>
