<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main" class="page-width container-fluid admin-layout">

    <%@ include file="../fragments/admin.jspf" %>

    <div class="admin-content">
        <p class="eyebrow">A CLEARER PICTURE</p>
        <h1>Payment ledger.</h1>
        <label for="table-search" class="visually-hidden">Filter payments</label>
        <input id="table-search" class="form-control table-search" data-table-filter placeholder="Search payment ID, order or status…">
        <section class="panel table-responsive">
            <table class="table align-middle">
                <thead>
                    <tr>
                        <th>Payment</th>
                        <th>Order</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach items="${payments}" var="p">
                        <tr>
                            <td>
                                <code><c:out value="${p.gatewayPaymentId}" /></code>
                                <br><small class="muted"><c:out value="${p.createdAt}" /></small>
                            </td>
                            <td>
                                <a class="text-link" href="<c:url value='/orders/${p.orderId}'/>">FF–${p.orderId} ↗</a>
                            </td>
                            <td><c:out value="${p.money}" /></td>
                            <td><span class="state"><c:out value="${p.status}" /></span></td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
            <c:if test="${empty payments}">
                <p class="empty-state">Payment activity will appear after a test checkout.</p>
            </c:if>
        </section>
    </div>
</main>

<%@ include file="../fragments/footer.jspf" %>
