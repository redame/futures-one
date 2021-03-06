package fwj.futures.resource.prod.vo;

import java.util.List;

import fwj.futures.resource.price.vo.Price;

public class ProdContracts {

	private String code;
	private String from;
	private String to;
	private String latest;
	private List<Contract> contracts;

	public ProdContracts(String code, String from, String to, String latest, List<Contract> contracts) {
		this.code = code;
		this.from = from;
		this.to = to;
		this.latest = latest;
		this.contracts = contracts;
	}

	public String getCode() {
		return code;
	}

	public String getFrom() {
		return from;
	}

	public String getTo() {
		return to;
	}

	public String getLatest() {
		return latest;
	}

	public List<Contract> getContracts() {
		return contracts;
	}

	public static class Contract implements Comparable<Contract> {
		private String contract;
		private long totalVol;
		private long latestVol;
		private List<Price> prices;

		public Contract(String contract, long totalVol, long latestVol, List<Price> prices) {
			this.contract = contract;
			this.totalVol = totalVol;
			this.latestVol = latestVol;
			this.prices = prices;
		}

		public String getContract() {
			return contract;
		}

		public long getTotalVol() {
			return totalVol;
		}

		public long getLatestVol() {
			return latestVol;
		}

		public List<Price> getPrices() {
			return prices;
		}

		@Override
		public int compareTo(Contract that) {
			return this.contract.compareTo(that.contract);
		}

	}

}
