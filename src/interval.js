class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  // toString() {
  //   return '[' + this.start + ',' + this.end + ']';
  // }

  toString() {
    return `[${this.start},${this.end}]`;
  }

  /**
   * Exemple 1 :
   *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval1.overlaps(interval2) => true
   *
   * Exemple 2 :
   *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                                       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval1.overlaps(interval2) => false
   *
   * @param {Interval} interval
   * @returns {boolean}
   */
  overlaps(interval) {
    return this.end > interval.start && this.start < interval.end;
  }

  /**
   * Retourne true si cet interval contient le paramètre interval
   *
   * Exemple 1 :
   *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                  ▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval1.includes(interval2) => true
   *
   * Exemple 2 :
   *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval1.includes(interval2) => false
   *
   * @param {Interval} interval
   * @returns {boolean}
   */
  includes(interval) {
    return this.end >= interval.end && this.start <= interval.start;
  }

  /**
   * Retourne l'union de deux intervals
   *
   * Exemple 1 :
   *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                              ▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval1.union(interval2) =>        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
   *
   * Exemple 2 :
   *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                                      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval1.union(interval2) =>        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
   *
   * @param {Interval} interval
   * @returns {Interval[]}
   */
  union(interval) {
    let res = [];
    let start, end;
    if (
      this.overlaps(interval) ||
      this.end == interval.start ||
      this.start == interval.end
    ) {
      start = interval.start < this.start ? interval.start : this.start;
      end = interval.end > this.end ? interval.end : this.end;
      res.push(new Interval(start, end));
    } else {
      res.push(this);
      res.push(interval);
      res.sort((a, b) => a.start - b.start);
    }
    return res;
  }

  /**
   * Retourne l'intersection de deux intervals
   *
   * Exemple 1 :
   *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                              ▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval1.intersection(interval2) =>                     ▒▒▒▒▒
   *
   * Exemple 2 :
   *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                                      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval1.intersection(interval2) => <tableau vide>
   *
   * @param {Interval} interval
   * @returns {Interval|null}
   */
  intersection(interval) {
    if (this.overlaps(interval)) {
      if (this.includes(interval)) return interval;
      else if (interval.includes(this)) return this;
      else {
        let start = this.start > interval.start ? this.start : interval.start;
        let end = this.end < interval.end ? this.end : interval.end;
        return new Interval(start, end);
      }
    }
    return null;
  }

  /**
   * Retourne l'exclusion de deux intervals
   *
   * Exemple 1 :
   *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                              ▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval1.exclusion(interval2) =>    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒     ▒▒▒▒▒▒▒▒
   *
   * Exemple 2 :
   *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                                      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval1.exclusion(interval2) =>    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
   *
   * @param {Interval} interval
   * @returns {Interval[]}
   */
  exclusion(interval) {
    let res = [];
    if (this === interval) return [];
    else {
      let arr = [this.start, this.end, interval.start, interval.end];
      arr.sort(function(a, b) {
        return a - b;
      });
      res.push(new Interval(arr[0], arr[1]));
      res.push(new Interval(arr[2], arr[3]));
    }
    return res;
  }
}

module.exports = Interval;
