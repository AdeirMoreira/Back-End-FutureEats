class hashManagerMock {
    hash = (plainText:string):string => 'hash'
    
    compare = (plainText:string, cypherText: string):boolean => plainText === cypherText
}

export default new hashManagerMock()