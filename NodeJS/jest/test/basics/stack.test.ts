interface IItems {
    [key: number]: any;
}


class Stack {
    top: number;
    items: IItems;

    constructor() {
        this.top = -1;
        this.items = {}
    }

    get peek(){
        return this.items[this.top]
    }

    push(value: any) {
        this.top += 1;
        this.items[this.top] = value
    }

    pop() {
        delete this.items[this.top]
        this.top -= 1;
    }

}

describe('My Stack', () => {
    let stack: Stack;
    beforeEach(() => stack = new Stack())
    it('is created empty', () => {
        expect(stack.top).toBe(-1)
        expect(stack.items).toEqual({})
    });
    it('can push to the top', () => {
        stack.push('p');
        expect(stack.top).toBe(0);
        expect(stack.peek).toBe('p')
    });
    it('can pop off', () => {
        stack.push('a');
        stack.push('b');
        stack.push('c');
        stack.pop();
        expect(stack.top).toBe(1);
        expect(stack.peek).toBe('b')
    })
})