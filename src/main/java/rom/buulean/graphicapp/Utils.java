package rom.buulean.graphicapp;

public class Utils {

    public Integer mapRange2(Integer inputNumber, Integer maxInput, Integer minInput, Integer maxOutput, Integer minOutput) {
        Integer outputNumber = 1;;
        if (inputNumber <= maxInput && inputNumber >= minInput) {
            outputNumber =  ((inputNumber - minInput) * (maxOutput - minOutput )) / (maxInput - minInput) + minOutput;
        }
        return outputNumber;
    }

}
