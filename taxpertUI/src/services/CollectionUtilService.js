class CollectionUtilService {
  static identity(arg) {
    return arg;
  }

  static compareBy(collection, iteratee, comparator) {
    const asArray = Array.isArray(collection)
      ? collection
      : Object.values(collection);
    let computed = null;
    let result = null;

    asArray.forEach((item) => {
      let current = item[iteratee];

      if (typeof iteratee === "function") {
        current = iteratee(item);
      }

      if (
        current !== null &&
        (computed === null || comparator(current, computed))
      ) {
        computed = current;
        result = item;
      }
    });

    return result;
  }

  static maxBy(collection, iteratee = CollectionUtilService.identity) {
    const strictGreaterThan = (itemA, itemB) => itemA > itemB;

    return CollectionUtilService.compareBy(
      collection,
      iteratee,
      strictGreaterThan
    );
  }

  static minBy(collection, iteratee = CollectionUtilService.identity) {
    const strictLessThan = (itemA, itemB) => itemA < itemB;

    return CollectionUtilService.compareBy(
      collection,
      iteratee,
      strictLessThan
    );
  }

  static groupBy(collection, partitioner) {
    const asArray = Array.isArray(collection)
      ? collection
      : Object.values(collection);
    const byProperty = asArray.reduce((acc, item) => {
      let partitionKey = partitioner;

      if (typeof partitioner === "function") {
        partitionKey = partitioner(item);
      }

      acc[partitionKey] = acc[partitionKey] || [];

      acc[partitionKey].push(item);

      return acc;
    }, {});

    return byProperty;
  }

  static sumBy(collection, iteratee = CollectionUtilService.identity) {
    const asArray = Array.isArray(collection)
      ? collection
      : Object.values(collection);
    const sum = asArray.reduce((acc, item) => {
      let current = item[iteratee];

      if (typeof iteratee === "function") {
        current = iteratee(item);
      }

      if (current !== undefined) {
        return acc + current;
      }

      return acc;
    }, 0);

    return sum;
  }

  static keyBy(collection, partitioner) {
    const asArray = Array.isArray(collection)
      ? collection
      : Object.values(collection);
    const byProperty = asArray.reduce((acc, item) => {
      let partitionKey = partitioner;

      if (typeof partitioner === "function") {
        partitionKey = partitioner(item);
      }

      acc[partitionKey] = item;

      return acc;
    }, {});

    return byProperty;
  }

  static countBy(collection, partitioner) {
    const asArray = Array.isArray(collection)
      ? collection
      : Object.values(collection);
    const counted = asArray.reduce((acc, item) => {
      let partitionKey = partitioner;

      if (typeof partitioner === "function") {
        partitionKey = partitioner(item);
      }

      acc[item[partitionKey]] = acc[item[partitionKey]] || 0;

      acc[item[partitionKey]] += 1;

      return acc;
    }, {});

    return counted;
  }

  static intersection(collectionOne, collectionTwo) {
    let setOne = collectionOne;
    let setTwo = collectionTwo;

    if (Array.isArray(setOne)) {
      setOne = new Set([...collectionOne]);
    }

    if (Array.isArray(setTwo)) {
      setTwo = new Set([...collectionTwo]);
    }

    const intersect = new Set([...setOne].filter((item) => setTwo.has(item)));
    const asArray = [...intersect];

    return asArray;
  }

  static pickBy(collection, iteratee) {
    const curated = Object.entries(collection).reduce(
      (acc, [propertyName, propertyValue]) => {
        if (typeof iteratee === "function") {
          acc[propertyName] = iteratee(propertyValue);
        } else if (
          propertyValue !== null &&
          propertyValue !== undefined &&
          propertyValue !== false
        ) {
          acc[propertyName] = propertyValue;
        }

        return acc;
      },
      {}
    );

    return curated;
  }

  static flatDeep(collection, childrenPropName = "children") {
    const flatCollection = [];

    for (const item of collection) {
      flatCollection.push(item);

      if (
        Array.isArray(item[childrenPropName]) &&
        item[childrenPropName].length > 0
      ) {
        const flatChildren = CollectionUtilService.flatDeep(
          item[childrenPropName],
          childrenPropName
        );

        flatCollection.push(...flatChildren);
      }
    }

    return flatCollection;
  }

  static hasRole(role, roles) {
    const roleAsArray = Array.isArray(role) ? role : [role];
    const rolesAsArray = Array.isArray(roles) ? roles : [roles];
    const rolesIntersection = CollectionUtilService.intersection(
      rolesAsArray,
      roleAsArray
    );

    return rolesIntersection.length > 0;
  }

  static difference(collectionOne, collectionTwo) {
    const setA =
      collectionOne instanceof Set ? collectionOne : new Set(collectionOne);
    const setB =
      collectionTwo instanceof Set ? collectionTwo : new Set(collectionTwo);

    return new Set(
      Array.from(setA).filter((item) => {
        return !setB.has(item);
      })
    );
  }
}

export default CollectionUtilService;
