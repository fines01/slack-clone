import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { share, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  /**
   * Returns a collection either sorted in ascending order by the values of the passed field name,
   * or in the order the documents are stored in the collection
   * @param {string} collectionName
   * @param {string} orderByDoc - fieldname by which to sort the collection, will be sorted in ascending order
   * @returns {Observable} - a collection
   */
  getCollection(collectionName: string, orderByDoc?: string) {
    let queryFn!: any;
    orderByDoc ?  queryFn = (ref: any) => ref.orderBy(orderByDoc, 'asc') : queryFn = undefined;
    return this.firestore
      .collection(collectionName, queryFn  )
      .valueChanges({idField: 'id'}) //returns collection / Observable that can be subscribed inside the component
      .pipe( shareReplay(1) )
    }
    /* Warum shareReplay():

    share()-Operator: Gibt die Daten aus dem source observable frei, anstatt sie für jede neue Subscription neu zu abonnieren
    (PROBLEM async pipes-Abonnements in Vorlagen geben keine Daten zurück, da der Stream bereits aktiv ist und seine ersten Daten ausgesendet hat. Nachfolgende Abonnements erhalten nur dann Daten, wenn eine neue Datenemission auf dem Stream ausgelöst wird.
    LéSUNG: Mit shareReplay() wird der letzte Wert, der auf dem Stream gesendet wurde, 'wiedergegeben' (hier wird shareReplay(1) einen vorherigen Wert senden, wenn wir ihn abonnieren.

    param refCount 1 --> bufferSize von 1, wir wollen, dass nur ein vorheriger Wert für jeden neuen Abonnenten 'wiedergegeben' wird.
    optional: ShareReplyConfig: sharereply({ bufferSize: 1, refCount: true})
    refCount: standardmäßig falsch. Wenn true: unser shareReplay-Stream wird sich von der Quell-Observable abmelden, wenn es keine Abonnenten mehr gibt,
    Andernfalls bleibt der shareReply-Stream bei der Quell-Observable abonniert und läuft einfach weiter (macht vielleicht Sinn, wenn ich diesen einzelnen db-Stream während der gesamten Lebensdauer der App konsistent verfügbar halten möchte)

    */

    /**
     *
     * @param {string} id
     * @param {string} collectionName
     * @returns {Observable} - firestore collection document
     */
  getDocByID(id: string, collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .doc(id)
      .valueChanges()
      .pipe ( share() );
  }

  /**
   * @param field - field name in document of the passed collection
   * @param value - value of the given field
   * @param collectionName - name of the collection in which to search for matching documents
   * @returns array of all found documents of the collection that match the passed value
   */
  getDocsByValue(field: string, value: any, collectionName: string){ // T
    return this.firestore
      .collection(collectionName, ref => ref.where(field, '==', value))
      .valueChanges({idField: 'id'})
      .pipe( share() );
  }

  /**
   * Adds a document to a firestore collection
   * @param {object} doc - the document as JSON object
   * @param {string} collectionName
   * @returns {Promise<DocumentReference<unknown>>}
   */
  addDoc(doc: Object, collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .add(doc)
  }

  /**
   * creates or updates a document with a given ID.
   * If only some of the fields of a document are passed, only the corresponding fields will be updated (the document will be merged).
   * @param {object} doc - document as json object.
   * @param {string} id - document id
   * @param {string} collectionName
   * @returns {Promise}
   */
  createOrUpdateDoc(doc: any, id: string, collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .doc(id)
      .set(doc, {merge: true})
  }

  // deleteDoc
  deleteDoc(id: string, collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .doc(id)
      .delete();
  }
}
