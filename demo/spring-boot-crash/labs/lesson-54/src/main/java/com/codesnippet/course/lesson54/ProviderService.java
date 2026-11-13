package com.codesnippet.course.lesson54;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.ObjectProvider;
@Service
public class ProviderService {
    private final ObjectProvider<PrototypeBean> provider;
    public ProviderService(ObjectProvider<PrototypeBean> provider) { this.provider=provider; }
    public int serve() { return provider.getObject().identity(); }
}
