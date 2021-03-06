package fwj.futures.data.strategy.hedging.model;

import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.io.Files;

import fwj.futures.data.enu.ProdEnum;
import fwj.futures.data.launch.AbstractBaseLaunch;
import fwj.futures.data.process.DataURI;
import fwj.futures.resource.price.entity.KLine;
import fwj.futures.resource.price.repos.KLineRepos;

@Component
public class ExportOrigin extends AbstractBaseLaunch {

	@Autowired
	private KLineRepos kLineRepository;

	@Autowired
	private DataURI dataURI;

	@Override
	protected void execute() throws Exception {
		this.exportEndPrice("2015-01-01", "2015-09-02", ProdEnum.JiaoTan, ProdEnum.JiaoMei);
	}

	public static void main(String[] args) {
		launch(ExportOrigin.class);
	}

	public void exportEndPrice(String startDt, String endDt, ProdEnum... prods) throws Exception {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		exportEndPrice(df.parse(startDt), df.parse(endDt),
				Stream.of(prods).map(prod -> prod.getCode()).collect(Collectors.toList()));
	}

	public void exportEndPrice(Date startDt, Date endDt, List<String> codeList) throws Exception {
		Collections.sort(codeList);

		String head = codeList.stream().reduce("DATE", (l, r) -> l + "," + r);
		Map<Date, List<KLine>> kLineMap = codeList.stream()
				.map(code -> kLineRepository.findByCodeAndDtBetweenOrderByDtAsc(code, startDt, endDt))
				.flatMap(kLineList -> kLineList.stream())
				.collect(Collectors.groupingBy(KLine::getDt, Collectors.toList()));
		String content = kLineMap.entrySet().stream().filter(entry -> entry.getValue().size() == codeList.size())
				.sorted((l, r) -> l.getKey().compareTo(r.getKey())).map(entry -> {
					String dt = String.valueOf(entry.getKey().getTime());
					return entry.getValue().stream().sorted((l, r) -> l.getCode().compareTo(r.getCode()))
							.map(kLine -> kLine.getEndPrice().toString()).reduce(dt, (l, r) -> l + "," + r);
				}).reduce(head, (l, r) -> l + "\n" + r);

		String fileName = startDt + "_" + endDt + "_" + String.join("_", codeList);
		Files.asCharSink(dataURI.getModelFile(fileName), StandardCharsets.UTF_8).write(content);
	}
}
