class Level {
    constructor(inputCount, outputCount) {
        // values we will be getting from car's sensors
        this.inputs = new Array(inputCount);
        // will be computed by weights and biases
        this.outputs = new Array(outputCount);
        // bias is the value above which output fires
        this.biases = new Array(outputCount);

        this.weights = [];
        for (let i=0; i<inputCount; i++) {
            this.weights[i] = new Array(outputCount)
        }

        Level.#randomize(this);
    }

    static #randomize(level) {
        for (let i=0; i<level.inputs; i++) {
            for (let j=0; j<level.outputs.length; j++) {
                // value between -1 and 1
                level.weights[i][j] = Math.random()*2-1
            }
        }

        for (let i=0; i<level.biases.length; i++) {
            level.biases[i] = Math.random()*2-1;
        }
    }

    static feedForward(givenInputs) {
        for (let i=0; i<level.inputs.length; i++) {
            level.inputs[i]=givenInputs[i];
        }

        for (let i=0; i<level.outputs.length; i++) {
            // calculate sum 
            // between value of inputs and weights
            let sum = 0;
            for (let j=0; j<level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }

            // if sum is greater than bias
            if (sum > level.biases[i]) {
                // turn output ON
                level.outputs[i] = 1;
            } else {
                // turn output OFF
                level.outputs[i] = 0;
            }
        }

        return level.outputs;
    }


}