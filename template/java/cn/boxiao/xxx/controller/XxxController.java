package cn.boxiao.bxq.{{xxx}}.controller;

import javax.inject.Inject;
import javax.inject.Named;

import org.resthub.web.controller.ServiceBasedRestController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.boxiao.bxq.{{xxx}}.model.{{Xxx}};
import cn.boxiao.bxq.{{xxx}}.service.{{Xxx}}Service;

@Controller
@RequestMapping(value = "/api/{{xxx}}")
public class {{Xxx}}Controller extends ServiceBasedRestController<{{Xxx}}, String, {{Xxx}}Service> {
	
	@Override
	@Inject
	@Named("{{xxx}}Service")
	public void setService({{Xxx}}Service {{xxx}}Service) {
		super.setService({{xxx}}Service);
	}
}