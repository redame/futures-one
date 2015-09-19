package fwj.futures.resource.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

@Entity
public class Label extends AbstractPersistable<Integer> {

	private static final long serialVersionUID = 8016274632220644218L;

	private String name;

	private Integer rank;

	@Column(columnDefinition = "CHAR(1)")
	private String locked;

	public String getName() {
		return name;
	}

	public Integer getRank() {
		return rank;
	}

	public String getLocked() {
		return locked;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setRank(Integer rank) {
		this.rank = rank;
	}

	public void setLocked(String locked) {
		this.locked = locked;
	}

}
