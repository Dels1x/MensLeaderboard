package ua.delsix.exception;

import java.io.IOException;

public class NoIdException extends Exception {
    public NoIdException() {
    }

    public NoIdException(IOException e) {
        super(e);
    }
}
