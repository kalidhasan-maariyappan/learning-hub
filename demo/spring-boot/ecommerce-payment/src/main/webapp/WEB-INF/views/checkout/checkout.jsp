<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main" class="page-width container-fluid content-space">
    <div class="steps"><span>01 Bag</span><b>02 Details</b><span>03 Payment</span></div>
    <p class="eyebrow">THE LAST LITTLE DETAILS</p>
    <h1>Make it yours.</h1>
    <div class="checkout-grid">
        <section class="panel">
            <h2>Delivery details</h2>
            <p class="muted">For this test order only. Nothing will be shipped.</p>
            <form method="post" action="<c:url value='/checkout/create-order'/>" class="validated-form" data-loading="true">

                <%@ include file="../fragments/csrf.jspf" %>

                <input type="hidden" name="requestToken" value="${checkoutToken}">
                <div class="row g-3">
                    <div class="col-sm-6">
                        <label for="name">Full name</label>
                        <input class="form-control" id="name" name="name" autocomplete="name" value="<c:out value='${viewer.name}'/>" maxlength="100" required>
                    </div>
                    <div class="col-sm-6">
                        <label for="phone">Mobile number</label>
                        <input class="form-control" id="phone" name="phone" autocomplete="tel-national" inputmode="numeric" pattern="[6-9][0-9]{9}"
                            maxlength="10" title="10-digit Indian mobile number" required>
                    </div>
                    <div class="col-12">
                        <label for="street">Address</label>
                        <input class="form-control" id="street" name="street" autocomplete="street-address" maxlength="300" required>
                    </div>
                    <div class="col-sm-6">
                        <label for="city">City</label>
                        <input class="form-control" id="city" name="city" autocomplete="address-level2" maxlength="100" required>
                    </div>
                    <div class="col-sm-6">
                        <label for="state">State</label>
                        <input class="form-control" id="state" name="state" autocomplete="address-level1" maxlength="100" required>
                    </div>
                    <div class="col-sm-6">
                        <label for="pin">PIN code</label>
                        <input class="form-control" id="pin" name="pin" autocomplete="postal-code" pattern="[1-9][0-9]{5}" inputmode="numeric" maxlength="6"
                            required>
                    </div>
                </div>
                <button class="btn btn-primary mt-4">Create test order <i class="bi bi-arrow-right"></i></button>
                <p class="small muted mt-3">Prices and stock are checked again before your order is created.</p>
            </form>
        </section>
        <aside class="summary-card">
            <p class="eyebrow">YOUR CONSIDERED COLLECTION</p>
            <h2>Order review</h2>
            <c:forEach items="${cart.lines}" var="line">
                <div class="summary-row"><span><c:out value="${line.product.title}" /> × ${line.quantity}</span><span><c:out value="${line.money}" /></span>
                </div>
            </c:forEach>
            <div class="summary-row"><span>Delivery</span><span>Complimentary</span></div>
            <div class="summary-row summary-total"><span>Total</span><span><c:out value="${cart.money}" /></span></div>
            <div class="test-note"><i class="bi bi-shield-check"></i><span>Razorpay Test Mode
                    <br><small>No real money will be charged.</small>
                </span></div>
        </aside>
    </div>
</main>

<%@ include file="../fragments/footer.jspf" %>
