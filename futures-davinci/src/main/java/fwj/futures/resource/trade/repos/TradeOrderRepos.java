package fwj.futures.resource.trade.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fwj.futures.resource.trade.entity.TradeOrder;

@RepositoryRestResource(exported = false)
public interface TradeOrderRepos extends JpaRepository<TradeOrder, Integer> {

	TradeOrder findBySerialNo(String serialNo);

}
