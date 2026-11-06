<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main" class="page-width container-fluid admin-layout">

    <%@ include file="../fragments/admin.jspf" %>

    <div class="admin-content">
        <p class="eyebrow">A LITTLE PERSPECTIVE</p>
        <div class="section-heading">
            <h1>Studio overview.</h1><span class="state">TEST MODE</span>
        </div>
        <div class="kpi-grid">
            <div class="kpi"><span>Total orders</span><strong>${orderCount}</strong><small>All customer orders</small></div>
            <div class="kpi"><span>Captured payments</span><strong><c:out value="${revenue}" /></strong><small>Gross test payment volume</small></div>
            <div class="kpi"><span>Processed refunds</span><strong><c:out value="${refunded}" /></strong><small>Confirmed with Razorpay</small></div>
            <div class="kpi"><span>In the collection</span><strong>${productCount}</strong><small>Products in your catalogue</small></div>
        </div>
        <section class="panel">
            <div class="section-heading">
                <h2>Recent orders</h2>
                <a class="text-link" href="<c:url value='/admin/orders'/>">View all ↗</a>
            </div>

            <%@ include file="../fragments/order-table.jspf" %>

        </section>
        <div class="admin-info mt-4"><i class="bi bi-info-circle"></i>
            <div><strong>Payment confirmation is always server-side.</strong>
                <p>Checkout signatures are verified, then payment amount, currency, order and capture status are checked with Razorpay. <c:choose>
                        <c:when test="${webhookConfigured}">A local webhook secret is configured; delivery also requires a registered public endpoint.</c:when>
                        <c:otherwise>Webhook delivery is not configured. Use “Refresh payment status” to reconcile orders.</c:otherwise>
                    </c:choose>
                </p>
            </div>
        </div>
    </div>
</main>

<%@ include file="../fragments/footer.jspf" %>
