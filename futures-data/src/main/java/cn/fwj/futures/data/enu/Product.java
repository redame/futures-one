package cn.fwj.futures.data.enu;

public enum Product {
	
	/* ֣����Ʒ������  */
	CaiYou("OI", "����", Exchange.ZZ),
	
	/* ������Ʒ������  */
	JiDan("JD", "����", Exchange.DL), 
	YuMi("C", "����", Exchange.DL), 
	DouPo("M", "����", Exchange.DL), 
	DaDou1("A", "��һ��",Exchange.DL),	
	DouYou("Y", "����",Exchange.DL),
	ZongLvYou("P", "�����",Exchange.DL),
	DaDou2("B", "�󶹶���",Exchange.DL);
	


	private String code;
	private String name;
	private Exchange exchange;

	Product(String code, String name, Exchange exchange) {
		this.code = code;
		this.name = name;
		this.exchange = exchange;
	}

	public String getCode() {
		return code;
	}

	public String getName() {
		return name;
	}

	public Exchange getExchange() {
		return exchange;
	}
	
	public String toString() {
		return code + "(" + name + ")"; 
	}

}
