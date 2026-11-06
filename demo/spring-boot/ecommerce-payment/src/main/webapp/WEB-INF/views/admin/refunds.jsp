<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main" class="page-width container-fluid admin-layout">

    <%@ include file="../fragments/admin.jspf" %>

    <div class="admin-content">
        <p class="eyebrow">THOUGHTFULLY RESOLVED</p>
        <h1>Refunds.</h1>
        <section class="panel">
            <h2>Issue a test refund</h2>
            <p class="muted">Refund a captured payment in full or in part. Pending refunds reserve their amount, so repeated requests cannot exceed the payment.
            </p>
            <form action="<c:url value='/admin/refunds'/>" method="post" class="validated-form" data-loading="true">

                <%@ include file="../fragments/csrf.jspf" %>

                <input type="hidden" name="requestToken" value="${refundToken}">
                <div class="row g-3 align-items-end">
                    <div class="col-md-7">
                        <label for="paymentId">Captured payment</label>
                        <select class="form-select" id="paymentId" name="paymentId" required>
                            <option value="">Choose a payment</option>
                            <c:forEach items="${payments}" var="p">
                                <c:if test="${p.status eq 'captured'}">
                                    <option value="${p.id}"><c:out value="${p.gatewayPaymentId}" /> · <c:out value="${p.money}" /> · FF–${p.orderId}</option>
                                </c:if>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="amount">Amount (INR)</label>
                        <input class="form-control" id="amount" name="amount" type="number" min="1" max="1000000" step="0.01" placeholder="0.00" required>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary">Refund ↗</button>
                    </div>
                </div>
            </form>
        </section>
        <section class="panel mt-4">
            <h2>Refund activity</h2>
            <div class="table-responsive">
                <table class="table align-middle">
                    <thead>
                        <tr>
                            <th>Refund / request</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach items="${refunds}" var="r">
                            <tr>
                                <td>
                                    <code><c:out value="${r.gatewayRefundId}" /></code>
                                    <br><small class="muted"><c:out value="${r.requestToken}" /></small>
                                </td>
                                <td><c:out value="${r.money}" /></td>
                                <td><span class="state"><c:out value="${r.status}" /></span></td>
                                <td>
                                    <c:if test="${r.status eq 'unknown' or r.status eq 'submitting'}">
                                        <form method="post" action="<c:url value='/admin/refunds'/>" data-loading="true">

                                            <%@ include file="../fragments/csrf.jspf" %>

                                            <input type="hidden" name="paymentId" value="${r.paymentId}">
                                            <input type="hidden" name="amount" value="${r.amountMinorUnits/100}">
                                            <input type="hidden" name="requestToken" value="<c:out value='${r.requestToken}'/>">
                                            <button class="text-button">Retry same request ↗</button>
                                        </form>
                                    </c:if>
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
                <c:if test="${empty refunds}">
                    <p class="muted">No refunds yet.</p>
                </c:if>
            </div>
        </section>
    </div>
</main>

<%@ include file="../fragments/footer.jspf" %>
