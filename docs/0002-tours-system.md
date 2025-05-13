# HuddleHub Data Models Documentation

This document outlines the database schema for HuddleHub, an application for scheduling tours.

## Core Entities

### 1. `Traveller` Table
Stores information about users who book tours.

| Column         | Type          | Constraints                   | Description                               |
|----------------|---------------|-------------------------------|-------------------------------------------|
| `id`           | Integer/UUID  | Primary Key, Auto-incremented | Unique identifier for the traveller.      |
| `name`         | String        | Not Null                      | Full name of the traveller.               |
| `email`        | String        | Not Null, Unique              | Email address (used for login/contact).   |
| `passwordHash` | String        | Not Null                      | Hashed password for authentication.       |
| `createdAt`    | Timestamp     | Not Null, Default NOW         | Timestamp of account creation.            |
| `updatedAt`    | Timestamp     | Not Null, Default NOW         | Timestamp of last profile update.         |
| ...            | ...           |                               | (Other fields like phone, preferences)    |

### 2. `Guide` Table
Stores information about users who offer and lead tours.

| Column            | Type          | Constraints                   | Description                               |
|-------------------|---------------|-------------------------------|-------------------------------------------|
| `id`              | Integer/UUID  | Primary Key, Auto-incremented | Unique identifier for the guide.          |
| `userId`          | Integer/UUID  | FK to `User` (optional)       | Link to a general user account if used.   |
| `name`            | String        | Not Null                      | Full name of the guide.                   |
| `email`           | String        | Not Null, Unique              | Email address (used for login/contact).   |
| `passwordHash`    | String        | Not Null                      | Hashed password for authentication.       |
| `bio`             | Text          | Nullable                      | Short biography or description.           |
| `profilePictureUrl`| String        | Nullable                      | URL to the guide's profile picture.       |
| `verified`        | Boolean       | Not Null, Default FALSE       | Indicates if guide's identity is verified.|
| `createdAt`       | Timestamp     | Not Null, Default NOW         | Timestamp of account creation.            |
| `updatedAt`       | Timestamp     | Not Null, Default NOW         | Timestamp of last profile update.         |
| ...               | ...           |                               | (Other fields like languages, specialties)|

## Guide-Initiated Tour Entities

### 3. `TourOffering` Table
Represents the *template* or *blueprint* of a tour a guide offers. A guide creates this once, and can then schedule multiple instances of it.

| Column                 | Type          | Constraints                   | Description                                       |
|------------------------|---------------|-------------------------------|---------------------------------------------------|
| `id`                   | Integer/UUID  | Primary Key, Auto-incremented | Unique identifier for the tour offering.          |
| `guideId`              | Integer/UUID  | Not Null, FK to `Guide.id`    | The guide who owns this tour offering.            |
| `title`                | String        | Not Null                      | Title of the tour (e.g., "Historical City Walk"). |
| `description`          | Text          | Not Null                      | Detailed description of the tour.                 |
| `baseDurationMinutes`  | Integer       | Not Null                      | Typical duration of the tour in minutes.          |
| `baseLocation`         | String        | Not Null                      | General starting point or area of the tour.       |
| `category`             | String        | Nullable                      | Category (e.g., "History", "Food", "Adventure").  |
| `photosJson`           | JSON/Text     | Nullable                      | Array of image URLs for the tour.                 |
| `standardInclusionsJson`| JSON/Text     | Nullable                      | Array of what's typically included.               |
| `isActive`             | Boolean       | Not Null, Default TRUE        | Whether the guide currently offers this.          |
| `createdAt`            | Timestamp     | Not Null, Default NOW         | Timestamp of creation.                            |
| `updatedAt`            | Timestamp     | Not Null, Default NOW         | Timestamp of last update.                         |

### 4. `TourInstance` Table
Represents a specific, scheduled occurrence of a `TourOffering` on a particular date and time, with its specific mode (Public/Private) and pricing.

| Column                  | Type          | Constraints                          | Description                                                     |
|-------------------------|---------------|--------------------------------------|-----------------------------------------------------------------|
| `id`                    | Integer/UUID  | Primary Key, Auto-incremented        | Unique identifier for the scheduled tour instance.              |
| `tourOfferingId`        | Integer/UUID  | Not Null, FK to `TourOffering.id`    | The tour blueprint this instance is based on.                   |
| `guideId`               | Integer/UUID  | Not Null, FK to `Guide.id`           | The guide conducting this instance (denormalized for convenience).|
| `startDateTime`         | Timestamp     | Not Null                             | Precise date and time the tour instance begins.                 |
| `status`                | String/ENUM   | Not Null, Default 'SCHEDULED'        | e.g., 'SCHEDULED', 'ACTIVE', 'COMPLETED', 'CANCELLED'.          |
| `tourMode`              | String/ENUM   | Not Null                             | 'PUBLIC' or 'PRIVATE'.                                          |
| `instanceSpecificNotes` | Text          | Nullable                             | Notes specific to this instance (e.g., route changes).          |
| `pricePerTraveler`      | Decimal       | Nullable (if `tourMode` is 'PUBLIC') | Price per person for public bookings.                           |
| `minTravelers`          | Integer       | Nullable (if `tourMode` is 'PUBLIC') | Minimum public bookings for the tour to run.                    |
| `maxTravelers`          | Integer       | Nullable (if `tourMode` is 'PUBLIC') | Maximum capacity for public bookings.                           |
| `bookedSlots`           | Integer       | Nullable, Default 0                  | Number of public slots currently booked.                        |
| `groupPrice`            | Decimal       | Nullable (if `tourMode` is 'PRIVATE')| Total price for a private group booking.                        |
| `maxGroupSize`          | Integer       | Nullable (if `tourMode` is 'PRIVATE')| Maximum number of people in a private group.                    |
| `isPrivatelyBooked`     | Boolean       | Nullable, Default FALSE              | True if a private group has booked this instance.               |
| `createdAt`             | Timestamp     | Not Null, Default NOW                | Timestamp of creation.                                          |
| `updatedAt`             | Timestamp     | Not Null, Default NOW                | Timestamp of last update.                                       |

### 5. `Booking` Table
Represents a booking made by a traveller for a `TourInstance`.

| Column              | Type          | Constraints                          | Description                                                       |
|---------------------|---------------|--------------------------------------|-------------------------------------------------------------------|
| `id`                | Integer/UUID  | Primary Key, Auto-incremented        | Unique identifier for the booking.                                |
| `tourInstanceId`    | Integer/UUID  | Not Null, FK to `TourInstance.id`    | The specific tour instance being booked.                          |
| `travellerId`       | Integer/UUID  | Not Null, FK to `Traveller.id`       | The traveller who made the booking (or main contact for a group). |
| `bookingType`       | String/ENUM   | Not Null                             | 'INDIVIDUAL' (public) or 'GROUP' (private).                       |
| `numberOfTickets`   | Integer       | Not Null                             | Number of spots booked. For 'GROUP', can be group size or 1.      |
| `totalAmountPaid`   | Decimal       | Not Null                             | Total amount paid for this booking.                               |
| `paymentStatus`     | String/ENUM   | Not Null, Default 'PENDING'          | e.g., 'PENDING', 'COMPLETED', 'REFUNDED'.                         |
| `bookingDateTime`   | Timestamp     | Not Null, Default NOW                | When the booking was made.                                        |
| `status`            | String/ENUM   | Not Null, Default 'CONFIRMED'        | e.g., 'CONFIRMED', 'CANCELLED_BY_TRAVELLER'.                      |
| `specialRequests`   | Text          | Nullable                             | Any special requests from the traveller.                          |
| `createdAt`         | Timestamp     | Not Null, Default NOW                | Timestamp of creation.                                            |
| `updatedAt`         | Timestamp     | Not Null, Default NOW                | Timestamp of last update.                                         |

## Traveler-Initiated Tour Request Entities (Future Consideration)

### 6. `TourRequest` Table
Stores requests for tours initiated by travelers, which guides can then bid on or accept.

| Column                   | Type          | Constraints                           | Description                                                     |
|--------------------------|---------------|---------------------------------------|-----------------------------------------------------------------|
| `id`                     | Integer/UUID  | Primary Key, Auto-incremented         | Unique identifier for the tour request.                         |
| `travellerId`            | Integer/UUID  | Not Null, FK to `Traveller.id`        | The traveller who created the request.                          |
| `title`                  | String        | Not Null                              | Traveller's desired name for the tour.                          |
| `description`            | Text          | Not Null                              | Detailed description of what the traveller wants.                 |
| `desiredLocation`        | String        | Not Null                              | Desired city, area, or "flexible".                              |
| `desiredDate`            | String/Date   | Not Null                              | Specific date, range, or "flexible".                            |
| `desiredStartTime`       | String/Time   | Nullable                              | e.g., "morning", "9:00 AM".                                     |
| `desiredDurationMinutes` | Integer       | Nullable                              | Desired tour length.                                            |
| `numberOfPeople`         | Integer       | Not Null                              | Number of people in the traveller's party.                      |
| `budgetIndication`       | String/Decimal| Nullable                              | Traveller's budget (e.g., "up to $X pp", "$Y total").           |
| `status`                 | String/ENUM   | Not Null, Default 'OPEN'              | e.g., 'OPEN', 'AWAITING_OFFERS', 'CONFIRMED', 'CANCELLED'.        |
| `createdAt`              | Timestamp     | Not Null, Default NOW                 | Timestamp of creation.                                          |
| `updatedAt`              | Timestamp     | Not Null, Default NOW                 | Timestamp of last update.                                       |

### 7. `TourRequestOffer` Table (Potential)
If multiple guides can offer to fulfill a `TourRequest`.

| Column                   | Type          | Constraints                           | Description                                                              |
|--------------------------|---------------|---------------------------------------|--------------------------------------------------------------------------|
| `id`                     | Integer/UUID  | Primary Key, Auto-incremented         | Unique identifier for the offer.                                         |
| `tourRequestId`          | Integer/UUID  | Not Null, FK to `TourRequest.id`      | The tour request this offer is for.                                      |
| `guideId`                | Integer/UUID  | Not Null, FK to `Guide.id`            | The guide making the offer.                                              |
| `offerDetails`           | Text          | Not Null                              | Guide's specific proposal, itinerary adjustments.                        |
| `proposedPrice`          | Decimal       | Not Null                              | The price quoted by the guide for this offer.                            |
| `proposedTourOfferingId` | Integer/UUID  | Nullable, FK to `TourOffering.id`     | If the guide is basing the offer on one of their standard offerings.     |
| `status`                 | String/ENUM   | Not Null, Default 'SUBMITTED'         | e.g., 'SUBMITTED', 'ACCEPTED_BY_TRAVELLER', 'REJECTED', 'WITHDRAWN'.   |
| `createdAt`              | Timestamp     | Not Null, Default NOW                 | Timestamp of creation.                                                   |
| `updatedAt`              | Timestamp     | Not Null, Default NOW                 | Timestamp of last update.                                                |

---

**Relationships Summary:**
*   A `Guide` can have many `TourOffering`s.
*   A `TourOffering` can have many `TourInstance`s.
*   A `Guide` is directly linked to their `TourInstance`s (even if via `TourOffering`).
*   A `TourInstance` can have many `Booking`s (if public) or one `Booking` (if private, representing the group).
*   A `Traveller` can have many `Booking`s.
*   A `Traveller` can create many `TourRequest`s.
*   A `TourRequest` can receive many `TourRequestOffer`s from different `Guide`s.

This documentation should serve as a good starting point. You can expand it with more details on ENUM values, specific constraints, or indexing strategies as you implement the database. 

---

## Tour Creation and Booking Flows

This section describes the typical sequences of events for tour creation and booking.

### Flow 1: Guide-Initiated Tour

This is the standard flow where a guide defines a tour and makes it available for booking.

1.  **Guide Creates `TourOffering`**:
    *   A `Guide` defines the blueprint of their tour (e.g., "Downtown History Walk") by creating a record in the `TourOffering` table. This includes details like title, description, base duration, location, category, photos, and standard inclusions.
    *   This `TourOffering` can be reused for multiple scheduled dates/times.

2.  **Guide Creates `TourInstance`(s)**:
    *   For each date and time they want to offer the tour, the `Guide` creates a `TourInstance` record, linking it to the `TourOffering`.
    *   In the `TourInstance`, the guide specifies:
        *   `startDateTime`: The exact date and time.
        *   `tourMode`:
            *   **'PUBLIC'**: The tour is open for individual bookings. The guide sets `pricePerTraveler`, `minTravelers` (for the tour to proceed), and `maxTravelers` (capacity).
            *   **'PRIVATE'**: The tour is offered for exclusive booking by a single group. The guide sets `groupPrice` and `maxGroupSize`.
    *   The `TourInstance` status is typically 'SCHEDULED'.

3.  **Traveller Booking**:
    *   **For 'PUBLIC' `TourInstance`s**:
        *   A `Traveller` discovers the `TourInstance`.
        *   They create a `Booking` record, specifying the `tourInstanceId`, `travellerId`, `bookingType` ('INDIVIDUAL'), `numberOfTickets`.
        *   The system updates `TourInstance.bookedSlots`.
        *   Payment is processed, and `Booking.paymentStatus` is updated.
    *   **For 'PRIVATE' `TourInstance`s**:
        *   A `Traveller` (representing a group) books the entire `TourInstance`.
        *   They create a `Booking` record, specifying `tourInstanceId`, `travellerId`, `bookingType` ('GROUP'), and `numberOfTickets` (can be the group size or 1 to signify the whole slot).
        *   The system sets `TourInstance.isPrivatelyBooked` to TRUE.
        *   Payment for the `groupPrice` is processed.

4.  **Tour Execution & Completion**:
    *   The `Guide` conducts the tour at the `startDateTime`.
    *   After the tour, `TourInstance.status` can be updated to 'COMPLETED'.

### Flow 2: Traveller-Initiated Tour (Future Consideration)

This flow allows travellers to request custom tours, and guides can then choose to fulfill these requests.

1.  **Traveller Creates `TourRequest`**:
    *   A `Traveller` submits their desired tour details by creating a `TourRequest` record. This includes their ideal title, description, location, date/time preferences, number of people, and potentially a budget.
    *   The `TourRequest.status` is initially 'OPEN'.

2.  **Guides Discover and Make Offers (Optional: `TourRequestOffer`)**:
    *   `Guide`s can browse open `TourRequest`s.
    *   If a `Guide` is interested, they can make an offer. This might involve:
        *   Creating a `TourRequestOffer` record linked to the `TourRequest` and their `Guide.id`.
        *   The offer includes `offerDetails` (how they'll meet the request, any adjustments), `proposedPrice`.
        *   They might link to one of their existing `TourOffering`s if it's a good starting point (`proposedTourOfferingId`).
        *   Multiple guides could potentially make offers on the same request.

3.  **Traveller Accepts an Offer**:
    *   The `Traveller` reviews any `TourRequestOffer`s received.
    *   They accept one offer. The `TourRequestOffer.status` is updated to 'ACCEPTED_BY_TRAVELLER'.
    *   The parent `TourRequest.status` is updated to 'CONFIRMED_WITH_GUIDE' (or similar), and the chosen `guideId` is associated with it.

4.  **System Creates `TourInstance` & `Booking`**:
    *   Upon offer acceptance, the system (or the guide through an interface) creates a corresponding `TourInstance`.
        *   `tourOfferingId`: Could be the `proposedTourOfferingId` from the offer, or a new, ad-hoc `TourOffering` might be implicitly created for this custom tour.
        *   `guideId`: The guide whose offer was accepted.
        *   `startDateTime`, `tourMode` (likely 'PRIVATE' or a special 'CUSTOM' type), pricing, and other details are derived from the `TourRequest` and the accepted `TourRequestOffer`.
    *   A `Booking` record is created, linking the original `Traveller` (from `TourRequest.travellerId`) to this new `TourInstance`. `bookingType` would be 'GROUP' or 'CUSTOM'.

5.  **Tour Execution & Completion**:
    *   Similar to the guide-initiated flow, the tour is conducted, and statuses are updated.

This provides a more dynamic marketplace where demand (traveller requests) can meet supply (guide services). 

---

## Complete System Flows and Table Relationships

This section provides a detailed explanation of the complete business flows in HuddleHub, highlighting the relationships and interactions between database tables at each step of the process.

### Guide-Initiated Tour: From Creation to Execution

#### 1. Tour Creation Phase

```
Guide → TourOffering → TourInstance
```

1. **Guide Registration and Profile Setup**
   * A new `Guide` record is created with profile information (`name`, `email`, `bio`, etc.)
   * This establishes the `guide.id` primary key used throughout the system

2. **Creating the Tour Offering (Blueprint)**
   * Guide creates a `TourOffering` record
   * Relationship: `TourOffering.guideId` (FK) → `Guide.id` (PK)
   * This links the tour offering to its creator/owner
   * Example query: `INSERT INTO TourOffering (guideId, title, description, ...) VALUES (5, 'Historic Downtown Walk', '...')`

3. **Scheduling Tour Instances**
   * Guide creates multiple `TourInstance` records
   * Two key relationships established:
     * `TourInstance.tourOfferingId` (FK) → `TourOffering.id` (PK): Links instance to its blueprint
     * `TourInstance.guideId` (FK) → `Guide.id` (PK): Denormalized for query efficiency
   * Tour mode and appropriate attributes are set:
     * If `tourMode = 'PUBLIC'`: Sets `pricePerTraveler`, `minTravelers`, `maxTravelers`
     * If `tourMode = 'PRIVATE'`: Sets `groupPrice`, `maxGroupSize`
   * Example batch creation: `INSERT INTO TourInstance (tourOfferingId, guideId, startDateTime, tourMode, ...) VALUES (12, 5, '2023-10-25 14:00:00', 'PUBLIC', ...)`

#### 2. Discovery and Booking Phase

```
Traveller → TourInstance ← TourOffering → Booking
```

1. **Traveler Registration**
   * A `Traveller` record is created with profile information
   * Establishes the `traveller.id` primary key used for bookings

2. **Tour Discovery**
   * Traveler searches for available tours using complex JOINs:
   * Example query: 
     ```sql
     SELECT ti.id, ti.startDateTime, ti.pricePerTraveler, to.title, to.description, g.name
     FROM TourInstance ti
     JOIN TourOffering to ON ti.tourOfferingId = to.id
     JOIN Guide g ON to.guideId = g.id
     WHERE ti.startDateTime > NOW() 
       AND ti.status = 'SCHEDULED'
       AND (ti.tourMode = 'PUBLIC' OR (ti.tourMode = 'PRIVATE' AND ti.isPrivatelyBooked = FALSE))
     ```

3. **Booking Creation**
   * When traveler books a tour, three tables interact:
     * A new `Booking` record is created
     * `TourInstance` is updated (e.g., incrementing `bookedSlots`)
     * Key relationships established:
       * `Booking.tourInstanceId` (FK) → `TourInstance.id` (PK): Links booking to specific instance
       * `Booking.travellerId` (FK) → `Traveller.id` (PK): Links booking to traveler
   * Example transaction for PUBLIC booking:
     ```sql
     BEGIN TRANSACTION;
     -- Create booking
     INSERT INTO Booking (tourInstanceId, travellerId, bookingType, numberOfTickets, totalAmountPaid, ...)
     VALUES (42, 78, 'INDIVIDUAL', 2, 50.00, ...);
     -- Update tour instance's booked slots 
     UPDATE TourInstance SET bookedSlots = bookedSlots + 2 WHERE id = 42;
     COMMIT;
     ```
   * Example transaction for PRIVATE booking:
     ```sql
     BEGIN TRANSACTION;
     -- Create booking
     INSERT INTO Booking (tourInstanceId, travellerId, bookingType, numberOfTickets, totalAmountPaid, ...)
     VALUES (43, 79, 'GROUP', 6, 300.00, ...);
     -- Mark tour as privately booked
     UPDATE TourInstance SET isPrivatelyBooked = TRUE WHERE id = 43;
     COMMIT;
     ```

#### 3. Pre-Tour Phase

```
Guide ↔ TourInstance ↔ Booking ↔ Traveller
```

1. **Tour Capacity Management**
   * System regularly checks if minimum traveler requirements are met:
     ```sql
     SELECT id, tourOfferingId, startDateTime 
     FROM TourInstance
     WHERE tourMode = 'PUBLIC'
       AND startDateTime BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 48 HOUR)
       AND bookedSlots < minTravelers
       AND status = 'SCHEDULED'
     ```
   * Guide notified if minimum not met; decides whether to proceed or cancel

2. **Information Exchange**
   * Guide can view all upcoming bookings and traveler contact info:
     ```sql
     SELECT b.id, t.name, t.email, b.numberOfTickets, b.specialRequests
     FROM Booking b
     JOIN Traveller t ON b.travellerId = t.id
     WHERE b.tourInstanceId = 42
     ```

#### 4. Tour Execution and Completion Phase

```
Guide → TourInstance → Booking
```

1. **Tour Status Updates**
   * As tour progresses, `TourInstance.status` changes:
     * 'SCHEDULED' → 'ACTIVE' → 'COMPLETED'
   * Example query: `UPDATE TourInstance SET status = 'ACTIVE' WHERE id = 42`

2. **Post-Tour Processing**
   * System can query completed tours for analysis:
     ```sql
     SELECT ti.id, to.title, COUNT(b.id) as totalBookings, SUM(b.totalAmountPaid) as revenue
     FROM TourInstance ti
     JOIN TourOffering to ON ti.tourOfferingId = to.id
     JOIN Booking b ON ti.id = b.tourInstanceId
     WHERE ti.status = 'COMPLETED' AND ti.guideId = 5
     GROUP BY ti.id, to.title
     ```

### Traveler-Initiated Tour: From Request to Execution

```
Traveller → TourRequest ← Guide → TourRequestOffer → TourOffering → TourInstance → Booking
```

1. **Tour Request Creation**
   * `Traveller` creates a `TourRequest` record
   * Relationship: `TourRequest.travellerId` (FK) → `Traveller.id` (PK)
   * Example: `INSERT INTO TourRequest (travellerId, title, description, desiredLocation, ...) VALUES (78, 'Custom Food Tour', ...)`

2. **Guide Offer Submission**
   * `Guide` discovers and responds to request by creating a `TourRequestOffer`
   * Multiple relationships established:
     * `TourRequestOffer.tourRequestId` (FK) → `TourRequest.id` (PK): Links offer to request
     * `TourRequestOffer.guideId` (FK) → `Guide.id` (PK): Links offer to guide
     * Optional: `TourRequestOffer.proposedTourOfferingId` (FK) → `TourOffering.id` (PK): If offer based on existing tour

3. **Offer Acceptance and Tour Creation**
   * When traveler accepts offer, a new `TourInstance` is created, potentially with a new `TourOffering`
   * `TourRequest.status` updated to 'CONFIRMED_WITH_GUIDE'
   * `TourRequestOffer.status` updated to 'ACCEPTED_BY_TRAVELLER'
   * A `Booking` record is automatically created linking traveler to this instance

### Recurring Schedule Management

```
Guide → RecurringSchedule → TourInstance ← TourOffering
```

For efficiently managing frequently recurring tours, an additional entity might be introduced:

1. **Creating a Recurring Schedule**
   * Guide defines a pattern rather than individual instances
   * Relationships:
     * `RecurringSchedule.guideId` (FK) → `Guide.id` (PK)
     * `RecurringSchedule.tourOfferingId` (FK) → `TourOffering.id` (PK)

2. **Just-in-Time Instance Generation**
   * System periodically creates new `TourInstance` records based on `RecurringSchedule` patterns
   * Only generates instances within a practical future window (e.g., next 3 months)
   * Example scheduled task:
     ```sql
     INSERT INTO TourInstance (tourOfferingId, guideId, startDateTime, tourMode, ...)
     SELECT rs.tourOfferingId, rs.guideId, 
            -- Next calculated dates based on pattern
            rs.tourMode, ...
     FROM RecurringSchedule rs
     WHERE rs.isActive = TRUE
     -- And logic to calculate next instances to create
     ```

### Database Transaction Integrity

Throughout these flows, maintaining data integrity across tables is crucial. Key strategies include:

1. **Use of Transactions**
   * Operations affecting multiple tables (like booking creation) should be wrapped in transactions
   * Ensures all-or-nothing outcomes

2. **Referential Integrity**
   * Foreign key constraints prevent orphaned records
   * Example: When a `TourOffering` is deleted, related `TourInstance` records should be handled (CASCADE or RESTRICT)

3. **Status Consistency**
   * Status changes in one table may trigger updates in related tables
   * Example: Cancelling a `TourInstance` should process refunds for all related `Booking` records

---

This comprehensive documentation covers the full lifecycle of both tour creation approaches, illustrating how the different database entities work together at each step of the process. It highlights the relational nature of the data model and demonstrates why separating concepts like `TourOffering`, `TourInstance`, and `Booking` into distinct tables enables a flexible, scalable, and maintainable system. 