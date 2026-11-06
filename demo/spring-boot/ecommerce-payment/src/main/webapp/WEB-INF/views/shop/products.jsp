<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main">
    <section class="hero page-width container-fluid">
        <div class="hero-copy">
            <p class="eyebrow"><span class="small-line"></span> EVERYDAY, ELEVATED</p>
            <h1>Objects for a
                <br>life <em>well lived.</em>
            </h1>
            <p class="hero-description">Thoughtful design. Lasting quality. Discover the things
                <br class="desktop-only"> that make the everyday feel a little more special.
            </p>
            <a class="btn btn-primary" href="#collection">Explore the collection <i class="bi bi-arrow-down-right"></i></a>
            <div class="hero-note"><span>01 / 06</span>
                <div class="tiny-rule"></div><span>Less, but better.</span>
            </div>
        </div>
        <div class="hero-art"><span class="art-label">THE QUIET CORNER
                <br>CURATED FOR YOU
            </span>
            <div class="hero-circle"></div>
            <img class="hero-lamp" src="<c:url value='/assets/images/lamp.svg'/>" alt="Sculptural sage green table lamp">
            <img class="hero-vase" src="<c:url value='/assets/images/vase.svg'/>" alt="Terracotta ceramic vase"><span class="hero-caption"><span
                    class="status-dot"></span> Considered. Crafted. Collected.</span><span class="hero-stamp">GOOD DESIGN
                <br>FOR EVERY DAY
                <br>✳
            </span>
        </div>
    </section>
    <div class="values-strip">
        <div class="page-width container-fluid"><span><i class="bi bi-box-seam"></i> Carefully curated</span><span><i class="bi bi-flower1"></i> Made to
                last</span><span><i class="bi bi-truck"></i> Complimentary delivery</span><span><i class="bi bi-shield-check"></i> Secure test checkout</span>
        </div>
    </div>
    <section id="collection" class="collection page-width container-fluid">
        <div class="section-heading">
            <div>
                <p class="eyebrow">THE EDIT</p>
                <h2>Find your everyday favourites.</h2>
            </div><span class="muted"><c:out value="${total}" /> considered essentials</span>
        </div>
        <div class="collection-tools">
            <nav class="category-tabs" aria-label="Categories">
                <a class="${empty category?'active':''}" href="<c:url value='/'/>#collection">All essentials</a>
                <c:forEach items="${categories}" var="cat"><c:url value="/" var="catUrl"><c:param name="category" value="${cat}" /></c:url>
                    <a class="${category eq cat?'active':''}" href="${catUrl}#collection"><c:out value="${cat}" /></a>
                </c:forEach>
            </nav>
            <form class="search" method="get" action="<c:url value='/'/>">
                <input type="hidden" name="category" value="<c:out value='${category}'/>"><i class="bi bi-search"></i>
                <label class="visually-hidden" for="search">Search products</label>
                <input id="search" name="q" maxlength="100" placeholder="Find something good…" value="<c:out value='${q}'/>">
                <button aria-label="Search"><i class="bi bi-arrow-right"></i></button>
            </form>
        </div>
        <div class="product-grid">
            <c:forEach items="${products}" var="p" varStatus="loop">
                <article class="product-card">
                    <a class="product-art art-${p.art}" href="<c:url value='/products/${p.id}'/>">
                        <c:if test="${loop.first}"><span class="product-label">THE EVERYDAY EDIT</span></c:if>
                        <c:if test="${p.stockQuantity eq 0}"><span class="product-label">OUT OF STOCK</span></c:if>
                        <img src="<c:url value='/assets/images/${p.art}.svg'/>" alt="<c:out value='${p.title}'/>"><span class="product-arrow"><i
                                class="bi bi-arrow-up-right"></i></span>
                    </a>
                    <div class="product-meta"><span class="eyebrow"><c:out value="${p.category}" /></span><span class="stock-note"><c:out
                                value="${p.stockQuantity gt 0 ? 'Ready for your everyday' : 'Back soon'}" /></span></div>
                    <div class="product-title">
                        <h3>
                            <a href="<c:url value='/products/${p.id}'/>"><c:out value="${p.title}" /></a>
                        </h3><span><c:out value="${p.money}" /></span>
                    </div>
                </article>
            </c:forEach>
        </div>
        <c:if test="${empty products}">
            <div class="empty-state"><i class="bi bi-search"></i>
                <h3>Nothing here just yet.</h3>
                <p>Try a different search or explore all essentials.</p>
                <a class="text-link" href="<c:url value='/'/>">Clear filters ↗</a>
            </div>
        </c:if>
        <c:if test="${pages gt 1}">
            <nav class="pagination-bar" aria-label="Product pages">
                <c:forEach begin="0" end="${pages-1}" var="n"><c:url value="/" var="pageUrl"><c:param name="q" value="${q}" /><c:param name="category"
                            value="${category}" /><c:param name="page" value="${n}" /></c:url>
                    <a class="btn ${page eq n?'btn-primary':'btn-outline-secondary'}" href="${pageUrl}#collection">${n+1}</a>
                </c:forEach>
            </nav>
        </c:if>
        <div class="collection-bottom"><span>Small details. A lasting difference.</span><span class="serif">Choose well. Live beautifully.</span><span>FORM
                &amp; FIELD — EST. 2026</span></div>
    </section>
</main>

<%@ include file="../fragments/footer.jspf" %>
