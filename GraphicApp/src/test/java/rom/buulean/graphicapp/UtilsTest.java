package rom.buulean.graphicapp;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UtilsTest {

    @Test
    void mapRange2a() {
        Utils u = new Utils();
        int result = u.mapRange2(50,100,0, 10,0);
        assertEquals(5, result);
    }

    @Test
    void mapRange2b() {
        Utils u = new Utils();
        int result = u.mapRange2(90,100,0, 10,0);
        assertEquals(9, result);
    }

    @Test
    void mapRange2c() {
        Utils u = new Utils();
        int result = u.mapRange2(20,100,0, 10,0);
        assertEquals(2, result);
    }


    @Test
    void mapRange2d() {
        Utils u = new Utils();
        int result = u.mapRange2(70,100,0, 10,0);
        assertEquals(7, result);
    }

    @Test
    void mapRange2e() {
        Utils u = new Utils();
        int result = u.mapRange2(100,100,0, 10,0);
        assertEquals(10, result);
    }

    @Test
    void mapRange2f() {
        Utils u = new Utils();
        int result = u.mapRange2(0,100,0, 10,0);
        assertEquals(0, result);
    }

    @Test
    void mapRange2g() {
        Utils u = new Utils();
        int result = u.mapRange2(200,100,0, 10,0);
        assertEquals(0, result);
    }
}
