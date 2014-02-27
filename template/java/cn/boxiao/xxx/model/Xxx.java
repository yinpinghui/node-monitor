package cn.boxiao.bxq.{{xxx}}.model;

import javax.persistence.Entity;
import javax.persistence.Table;

import cn.boxiao.bxq.BaseObject;

@Entity
@Table(name="MODIFY_{{xxx}}s")
public class {{Xxx}} extends BaseObject{
	
	{{#fields}}private {{fieldType}} {{fieldName}};{{/fields}}
	
}
