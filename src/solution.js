import _ from 'lodash';

export default (content) => {
    const object = convertToObject(content);
    console.log(count(object));
    console.log(priceOfNal(object));
    console.log(unit(object));
    console.log(paraha(object));
    console.log(armia(object));

};
    const convertToObject = (content) => {
        const current = content.split('\n').slice(1).map((el) => el.split('|').filter((el) => el !== ''));
        const Object = current.map((el) => ({

            Creature: el[0].trim(),
            Force: Number(el[1]),
            Health: Number(el[2]),
            Quantity: Number(el[3]),
            Height: Number(el[4]),
            Weight: Number(el[5]),
            Price: Number(el[6]),

        }));
        return Object;
  
  };
// 1. выведите число сколько всего видов существ в этой таблице
const count = (object) => `Количество рядов: ${object.length}`;

// 2. выведите стоимость найма 10 самых сильных существ и 20 вторых по силе
const priceOfNal = (object) => {
    const newObject = _.cloneDeep(object)
    const sorted = newObject.sort((a, b) => b.Force - a.Force)
    return `цена за 10 сильнейших созданий: ${sorted[0].Price * 10}\nцена за 20 вторых по силе созданий: ${sorted[1].Price * 20}`
    
};
// 3. Найдите самый толстый юнит и самый худой. Посчитайте стоимость найма отряда самых толстых и отряда самых худых.
const unit = (object) => {
    const newunit = _.cloneDeep(object)
    const sortUnit = newunit.sort((a, b) => b.Weight -a.Weight)
    return `цена за отряд самых толстых: ${sortUnit[0].Price * sortUnit[0].Quantity}\nцена за отряд самых тонких: ${sortUnit[sortUnit.length -1].Price * sortUnit[sortUnit.length -1].Quantity}`
    
}
// 4. Посчитайте, какой юнит будет самым невыгодным по соотношению цены и силы и самым выгодным
const paraha = (object) => {
    const parahaQ = object.reduce((acc, item) => {
        acc.push(item.Price / item.Force)
        return acc;
    },[])
    const parahaysser = parahaQ.indexOf(_.max(parahaQ))
    const onObgb = object[parahaysser]
    const parahaBest = parahaQ.indexOf(_.min(parahaQ))
    const onObgb2 = object[parahaBest]
    return `Самый выгодный юнит: ${onObgb2.Creature}\nСамый невыгодный юнит: ${onObgb.Creature}`
    
}
// 5. посчитайте, какую самую сильную армию мы можем нанять за 10000 (нужен показатель сила). 
// То есть мы должны найти самую сильную армию из одного типа юнитов за определенные деньги. 
// Посчитать какой у нас выходит стек на полученную стоимость и быть уверенными, что это стек самый лучший по соотношению силы и количества за наши деньги.

const armia = (object) => {
    const parahaQ = object.reduce((acc, item) => {
        acc.push(item.Price / item.Force)
        return acc;
    },[])
    const BestPrice = Math.min(...parahaQ)
    const index = parahaQ.indexOf(BestPrice)
    const unit = object[index]
    return `Самая лучшая армия за 10000: ${Math.floor(10000 / unit.Price)} ${unit.Creature}`    
}


