package fwj.futures.resource.entity.price;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.springframework.data.jpa.domain.AbstractPersistable;

@Entity
@Table(name = "price_kline", uniqueConstraints = {
		@UniqueConstraint(name = "kline_uni", columnNames = { "dt", "code" }) })
public class KLine extends AbstractPersistable<Integer>implements Comparable<KLine> {

	private static final long serialVersionUID = -2830714212177779485L;

	@Column(columnDefinition = "DATE")
	private Date dt;

	@Column(length = 2)
	private String code;

	private Integer tradeVol;

	@Column(precision = 10, scale = 2)
	private BigDecimal openPrice;

	@Column(precision = 10, scale = 2)
	private BigDecimal endPrice;

	@Column(precision = 10, scale = 2)
	private BigDecimal maxPrice;

	@Column(precision = 10, scale = 2)
	private BigDecimal minPrice;

	public String getCode() {
		return code;
	}

	public Integer getTradeVol() {
		return tradeVol;
	}

	public BigDecimal getOpenPrice() {
		return openPrice;
	}

	public BigDecimal getEndPrice() {
		return endPrice;
	}

	public BigDecimal getMaxPrice() {
		return maxPrice;
	}

	public BigDecimal getMinPrice() {
		return minPrice;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void setTradeVol(Integer tradeVol) {
		this.tradeVol = tradeVol;
	}

	public void setOpenPrice(BigDecimal openPrice) {
		this.openPrice = openPrice;
	}

	public void setEndPrice(BigDecimal endPrice) {
		this.endPrice = endPrice;
	}

	public void setMaxPrice(BigDecimal maxPrice) {
		this.maxPrice = maxPrice;
	}

	public void setMinPrice(BigDecimal minPrice) {
		this.minPrice = minPrice;
	}

	public Date getDt() {
		return dt;
	}

	public void setDt(Date dt) {
		this.dt = dt;
	}

	/*
	 * 按照dt升序
	 */
	@Override
	public int compareTo(KLine that) {
		int cmp = this.dt.compareTo(that.dt);
		if (cmp == 0) {
			cmp = this.code.compareTo(that.code);
		}
		return cmp;
	}
}
