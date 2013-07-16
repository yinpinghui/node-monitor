package cn.boxiao.bxq.{{xxx}}.service.impl;

import javax.inject.Inject;

import org.resthub.common.service.CrudServiceImpl;
import org.springframework.stereotype.Service;

import cn.boxiao.bxq.{{xxx}}.model.{{Xxx}};
import cn.boxiao.bxq.{{xxx}}.repository.{{Xxx}}Repository;
import cn.boxiao.bxq.{{xxx}}.service.{{Xxx}}Service;

@Service("{{xxx}}Service")
public class {{Xxx}}ServiceImpl extends CrudServiceImpl<{{Xxx}}, String, {{Xxx}}Repository> implements {{Xxx}}Service {
	@Override 
	@Inject
    public void setRepository({{Xxx}}Repository {{xxx}}Repository) {
        super.setRepository({{xxx}}Repository);
    }

}
